const express = require("express");
const router = express.Router();
const {
  validateFiles,
  deleteFileFromDrive,
  uploadFileToDrive,
} = require("./imageRepository");
const { folderId, drive } = require("../services/googleDriveServices");

router.post("/", async (req, res) => {
  const validationError = validateFiles(req, res);
  if (validationError) {
    return;
  }

  try {
    const uploadedFiles = [];

    if (req.files?.file) {
      const singleFile = await uploadFileToDrive(req.files.file[0]);
      uploadedFiles.push(singleFile);
    }

    if (req.files?.files) {
      const multipleFiles = await Promise.all(
        req.files.files.map((file) => uploadFileToDrive(file))
      );
      uploadedFiles.push(...multipleFiles);
    }

    res.json({ files: uploadedFiles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  const { per_page, pageToken = null } = req.query;

  let query = `'${folderId}' in parents`;

  try {
    const response = await drive.files.list({
      pageSize: Number(per_page),
      pageToken,
      fields: "nextPageToken, files(id, name, webViewLink, webContentLink)",
      q: query,
    });

    res.json({
      files: response.data?.files,
      nextPageToken: response.data?.nextPageToken,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await deleteFileFromDrive(id);
    res.json({ msg: "File deleted successfully" });
  } catch (error) {
    res.status(error.response?.status || 500).json({ msg: error.message });
  }
});

module.exports = router;
