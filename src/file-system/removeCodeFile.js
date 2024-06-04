const { unlinkSync } = require("fs"),
  { join } = require("path");
const fs = require("fs");

const removeCodeFile = async (uuid, lang, outputExt) => {
  const codeFile = join(process.cwd(), `codes/${uuid}.${lang}`),
    outputFile = join(process.cwd(), `outputs/${uuid}.${outputExt}`);

  await unlinkSync(codeFile);

  if (outputExt) await unlinkSync(outputFile);
};

const removeAllCodeFiles = async () => {
  const codeDir = join(process.cwd(), "codes"),
    outputDir = join(process.cwd(), "outputs");

  function emptyDirectory(folder) {
    fs.readdir(folder, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return;
      }

      files.forEach((file) => {
        const filePath = `${folder}/${file}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          } else {
            console.log(`Deleted file: ${filePath}`);
          }
        });
      });
    });
  }
  emptyDirectory(codeDir);
  emptyDirectory(outputDir);
};

module.exports = {
  removeCodeFile,
  removeAllCodeFiles,
};
