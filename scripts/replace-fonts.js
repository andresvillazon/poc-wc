const fs = require('fs');
const path = require('path');

// Get cdnUrl from environment variable or fallback to environment.prod.ts
let cdnUrl = process.env.CDN_URL;

if (!cdnUrl) {
  // Fallback to reading from environment.prod.ts
  const envPath = path.join(__dirname, '../src/environments/environment.prod.ts');
  const envContent = fs.readFileSync(envPath, 'utf8');

  // Extract cdnUrl
  const cdnUrlMatch = envContent.match(/cdnUrl:\s*['"]([^'"]+)['"]/);
  if (!cdnUrlMatch) {
    console.error('cdnUrl not found in environment.prod.ts and CDN_URL not set');
    process.exit(1);
  }
  cdnUrl = cdnUrlMatch[1];
}

// Replace in fonts.css
// const fontsCssPath = path.join(__dirname, '../dist/bundle/fonts.css');
// let fontsCss = fs.readFileSync(fontsCssPath, 'utf8');
// fontsCss = fontsCss.replace(/url\('\.\/fonts\//g, `url('${cdnUrl}fonts/`);
// fs.writeFileSync(fontsCssPath, fontsCss);

console.log(`Replaced fonts URLs with ${cdnUrl}`);

// Copiar .htaccess de .httaccess a dist/bundle
const srcHtaccess = path.join(__dirname, '../.htaccess');
const destHtaccess = path.join(__dirname, '../dist/bundle/.htaccess');
try {
  fs.copyFileSync(srcHtaccess, destHtaccess);
  console.log('.htaccess copiado correctamente a dist/bundle');
} catch (err) {
  console.error('Error copiando .htaccess:', err.message);
}

// // Eliminar dist / asesoramiento - angular - front y renombrar dist / bundle
// const distPath = path.join(__dirname, '../dist');
// const oldDir = path.join(distPath, 'asesoramiento-angular-front');
// const newDir = path.join(distPath, 'bundle');
// try {
//   if (fs.existsSync(oldDir)) {
//     fs.rmSync(oldDir, { recursive: true, force: true });
//     console.log('Eliminado dist/asesoramiento-angular-front');
//   }
//   fs.renameSync(newDir, oldDir);
//   console.log('Renombrado dist/bundle a dist/asesoramiento-angular-front');
// } catch (err) {
//   console.error('Error al eliminar o renombrar directorios:', err.message);
// }
