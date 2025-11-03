// scripts/deploy-wc.js
import { execSync, exec } from 'child_process';

import fs from 'fs';
import path from 'path';

const root = process.cwd();
const bundleDir = path.join(root, 'dist', 'bundle');
const testingWCDir = path.join(root, 'poc', 'tressis-poc');
const port = 8080;

const runCommand = (command, description) => {
  try {
    console.log(`⌛  ${description}...`);
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completado.\n`);
  } catch (err) {
    console.error(`❌ Error durante "${description}":`, err.message);
    process.exit(1);
  }
};

// --- 0️⃣ Ejecutar build antes de todo ---
runCommand('npm run build:wc-pdn && npm run postbuild', 'Compilando bundle local');

// --- 1️⃣ Borrar carpeta destino si existe ---
if (fs.existsSync(testingWCDir)) {
  console.log('🧹 Borrando carpeta testing-wc:', testingWCDir);
  fs.rmSync(testingWCDir, { recursive: true, force: true });
}

// --- 2️⃣ Copiar archivos desde dist/bundle ---
if (!fs.existsSync(bundleDir)) {
  console.error('❌ No se encontró la carpeta:', bundleDir);
  process.exit(1);
}

fs.mkdirSync(testingWCDir, { recursive: true });

console.log(`📦 Copiando contenido de ${bundleDir} a ${testingWCDir}...`);
exec(`cp -r "${bundleDir}/." "${testingWCDir}/"`, error => {
  if (error) {
    console.error('❌ Error al copiar archivos:', error.message);
    process.exit(1);
  } else {
    console.log('✅ Archivos copiados correctamente.');

    // --- 4️⃣ Levantar el servidor http ---
    console.log(`🚀 Levantando http-server en http://localhost:${port} ...\n`);
    const server = exec(`npx http-server ./poc -p ${port}`);

    server.stdout.on('data', data => process.stdout.write(data));
    server.stderr.on('data', data => process.stderr.write(data));

    server.on('close', code => {
      console.log(`📁 Servidor detenido (código ${code})`);
    });
  }
});
