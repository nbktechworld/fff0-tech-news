const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');

module.exports = class ImageService {
  constructor() {
    this.s3Client = new S3Client({
      region: 'us-east-1'
    });
    this.bucket = 'fff0-tech-news';
  }

  async send(file) {
    const key = `assets/images/${file.filename}`;
    const filePath = path.join(file.destination, file.filename);
    const fileBody = fs.createReadStream(filePath);
    await this.s3Client.send(new PutObjectCommand({
      ACL: 'public-read',
      Bucket: this.bucket,
      CacheControl: 'max-age=604800', // 60s * 60m * 24h * 7d
      Key: key,
      Body: fileBody,
      ContentLength: file.size,
      ContentType: file.mimetype, // e.g. image/jpeg
    }));
    return {
      thumbnailUrl: `https://${this.bucket}.s3.amazonaws.com/${key}`
    };
  }

  async remove(thumbnailUrl) {
    const thumbnailKey = thumbnailUrl.replace(`https://${this.bucket}.s3.amazonaws.com/`, '');

    await this.s3Client.send(new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: thumbnailKey,
    }));
  }
};
