// webpack.bundle.js
const path = require('path');
const fs = require('fs-extra');

const appName = 'tressis-poc';
const projectRoot = path.resolve(__dirname, '..');

const distDir = path.resolve(projectRoot, 'dist', appName);
const bundleDir = path.resolve(projectRoot, 'dist', 'bundle');

const filesToExclude = [
  'runtime.js',
  'polyfills.js',
  'scripts.js',
  'main.js',
];

// Limpia carpeta bundle
fs.emptyDirSync(bundleDir);

// Copia todos los archivos excepto JS, CSS principales Y ficheros excluidos anteriormente
fs.readdirSync(distDir).forEach(file => {
  const fullPath = path.join(distDir, file);

  // Copiar todo excepto los JS/CSS principales Y las fuentes originales
  if (!filesToExclude.includes(file)) {
    fs.copySync(fullPath, path.join(bundleDir, file));
  }
});

module.exports = {
  mode: 'production',
  entry: {
    bundle: [
      path.join(distDir, 'runtime.js'),
      path.join(distDir, 'polyfills.js'),
      path.join(distDir, 'main.js')
    ].filter(Boolean)
  },
  output: {
    filename: '[name].js', // genera dist/bundle/bundle.js
    path: bundleDir
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  optimization: {
    splitChunks: false,
    runtimeChunk: false
  }
};
