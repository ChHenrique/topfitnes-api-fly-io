const replaceInFile = require('replace-in-file');

const options = {
  files: 'dist/**/*.js',
  from: /from\s+['"](\.\.?\/[^'"]+)['"]/g,
  to: "from '$1.js'"
};

(async () => {
  try {
    const results = await replaceInFile.replaceInFile(options);
    console.log('Importações corrigidas:', results);
  } catch (error) {
    console.error('Erro:', error);
    process.exit(1);
  }
})();