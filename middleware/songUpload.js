const { Storage } = require("@google-cloud/storage")
const path = require("path");
const storage = new Storage();
const bucketName = process.env.BUCKET_NAME

async function uploadFile(file, destinationFileName) {
    try {
      const fileBuffer = Buffer.from(file.data);

      const bucket = storage.bucket(bucketName);
      const destination = path.join('songs', destinationFileName)

      const gcsFilePath = `songs/${destinationFileName}`;
      const gcsFile = bucket.file(gcsFilePath);

      await gcsFile.save(fileBuffer, {
        metadata: {
          contentType: file.mimetype,
        }
      })
  
      console.log(`File uploaded to: ${destination}`);
      return { status: true, bucketName, gcsFilePath }
    } catch (error) {
      console.error(`Error uploading file: ${error.message}`);
      return { status: false, bucketName: null, destinationFileName: null }
    }
}

module.exports = {
    uploadFile
}
