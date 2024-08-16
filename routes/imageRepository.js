const Stream = require("stream");
const { folderId, drive } = require("../services/googleDriveServices");

const maxFileSize = 1024 * 1024 * 1024; // 1GB

async function uploadFileToDrive(file) {
  const { originalname, mimetype, buffer } = file;

  const bufferStream = new Stream.PassThrough();
  bufferStream.end(buffer);
  const fileMetadata = {
    name: originalname,
    parents: [folderId],
  };
  const media = {
    mimeType: mimetype,
    body: bufferStream,
  };
  const uploadedFile = await drive.files.create({
    requestBody: fileMetadata,
    media: media,
  });

  // Yüklenen dosyanın ID'si ile dosya bilgilerini alın
  const fileData = await drive.files.get({
    fileId: uploadedFile.data.id,
    fields: "id, name, webViewLink, webContentLink", // İstediğiniz alanları alın
  });

  return fileData.data;
}

async function deleteFileFromDrive(fileId) {
  await drive.files.delete({ fileId });
}

const validateFiles = (req, res) => {
  if (!req.files?.file && !req.files?.files) {
    res.status(400).json({ msg: "No file uploaded" });
    return true;
  }

  // Check file size
  if (req.files?.file && req.files?.file[0]?.size > maxFileSize) {
    var mbayt = maxFileSize / 1024 / 1024;
    res.status(400).json({
      msg: `The file exceeds the maximum limit of ${mbayt} MB`,
    });
    return true;
  }

  if (req.files?.files) {
    const oversizedFiles = req.files?.files?.filter(
      (file) => file.size > maxFileSize
    );
    if (oversizedFiles.length > 0) {
      res.status(400).json({
        msg: `One or more files exceed the maximum limit of ${maxFileSize} bytes`,
      });
      return true;
    }
  }

  return false;
};

module.exports = {
  uploadFileToDrive,
  validateFiles,
  deleteFileFromDrive,
};
