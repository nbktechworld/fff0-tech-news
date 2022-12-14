const fs = require('fs');
const mime = require('mime');
const path = require('path');
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');

module.exports = class ImageService {
  constructor() {
    this.s3Client = new S3Client({
      region: 'us-east-1'
    });
    this.bucket = 'fff0-tech-news';
  }

  getKeyForFile(file) {
    const fileExtension = mime.getExtension(file.mimetype);
    return `assets/images/${file.filename}.${fileExtension}`;
  }

  getKeyForUrl(url) {
    return url.replace(`https://${this.bucket}.s3.amazonaws.com/`, '');
  }

  getUrlForFile(file) {
    return `https://${this.bucket}.s3.amazonaws.com/${this.getKeyForFile(file)}`;
  }

  isValid(file) {
    return file.mimetype.startsWith('image/');
  }

  async send(file) {
    const filePath = path.join(file.destination, file.filename);
    const fileBody = fs.createReadStream(filePath);
    await this.s3Client.send(new PutObjectCommand({
      ACL: 'public-read',
      Bucket: this.bucket,
      CacheControl: 'max-age=604800', // 60s * 60m * 24h * 7d
      Key: this.getKeyForFile(file),
      Body: fileBody,
      ContentLength: file.size,
      ContentType: file.mimetype, // e.g. image/jpeg
    }));
  }

  async remove(key) {
    await this.s3Client.send(new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    }));
  }
};
