const { google } = require("googleapis");
const path = require("path");

// TODO: You need to change the keyFilePath with your own keyFilePath
const keyFilePath = path.join(__dirname, "./your-secret-key.json");

// Google Drive API için kimlik doğrulama ayarı
const auth = new google.auth.GoogleAuth({
  keyFile: keyFilePath,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

// TODO: You need to change the folderId with your own folderId
const folderId = "your-folder-id";

module.exports = { drive, folderId };
