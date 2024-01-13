// wordCountPages.js

const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function getWordCountAndPages(filePath) {
  try {
    const { stdout } = await exec(`mammoth-cli ${filePath} --output-dir=output`);
    const lines = stdout.split('\n');
    const wordCountLine = lines.find((line) => line.includes('Words:'));
    const pageCountLine = lines.find((line) => line.includes('Pages:'));
    
    const wordCount = wordCountLine ? parseInt(wordCountLine.split(':')[1].trim()) : 0;
    const pageCount = pageCountLine ? parseInt(pageCountLine.split(':')[1].trim()) : 1;

    return { wordCount, pageCount };
  } catch (error) {
    console.error('Error:', error.message);
    return { wordCount: 0, pageCount: 1 };
  }
}

module.exports = getWordCountAndPages;
