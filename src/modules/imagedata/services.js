/** @format */

import { config } from 'dotenv';

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

config();

export default {
  viewPosts: async (imageName) => {
    try {
      const imagePath = path.join(
        __dirname,
        `./../../../downloads/${imageName}`
      );
      return await new Promise((resolve, reject) => {
        fs.open(imagePath, (error) => {
          if (error) {
            reject({ success: false, message: error.message });
          }
          resolve({
            success: true,
            imagePath,
          });
        });
      });
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
};
