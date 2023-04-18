const fs = require('fs');
const path = require('path');

async function buildFile(filename) {
  const fixtureDirectory = path.join('test', 'fixtures');
  return ({
    destination: fixtureDirectory,
    filename,
    originalname: filename,
    mimetype: 'image/jpeg',
    size: (await fs.promises.stat(path.join(fixtureDirectory, filename))).size,
  });
}

const FileUtility = {
  buildFile,
};

module.exports = FileUtility;
