/* eslint-disable comma-dangle */
/* eslint-disable */
/* eslint-disable arrow-body-style */
import { config } from 'dotenv';
import path from 'path';

config();

export default {
  pathToStoreDecryptedVideo: path.join(
    __dirname,
    `../../downloads/video${Date.now()}.mp4`
  ),
  videoThumbnailPath: path.join(__dirname, `../../downloads/`),
  baseUrl: `${process.env.BASE_URL}downloadFile/media/`,
  thumbnailUrl: `${process.env.BASE_URL}downloadFile/thumbnail/`,
  jsonFilePath: path.join(__dirname, `../../downloads/keys${Date.now()}.json`),
};
