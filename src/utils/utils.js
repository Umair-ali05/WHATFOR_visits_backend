/* eslint-disable comma-dangle */
/* eslint-disable */
/* eslint-disable arrow-body-style */

import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import { Configuration, OpenAIApi } from 'openai';
import { fileURLToPath } from 'url';
import pLimit from 'p-limit';

config();
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default {
  uploadFile: (image, imageName) => {
    try {
      let imageUrl = process.env.VIEW_IMAGE_URL;
      const Path = path.join(__dirname, `../../downloads/${imageName}`);
      return new Promise((resolve, reject) => {
        fs.writeFile(Path, image, (err) => {
          if (err) {
            reject(err.message);
          }
          resolve(`${imageUrl}/${imageName}`);
        });
      });
    } catch (error) {
      throw error.message;
    }
  },
  removeWhiteSpaceAndCapitalFirstLetter: (inputString) => {
    const trimmedString = inputString.trim().replace(/\s+/g, ' ');

    const capitalizedString =
      trimmedString.charAt(0).toUpperCase() + trimmedString.slice(1);

    return capitalizedString;
  },
  removeWhiteSpaceAndCapitalEachLetter: (inputString) => {
    const trimmedString = inputString.trim().replace(/\s+/g, ' ');
    const capitalizedString = trimmedString.toUpperCase();

    return capitalizedString;
  },

  checkWhiteSpaces: (inputString) => {
    const regex = /\s/; // Regular expression to match any white space character

    return regex.test(inputString);
  },

  covertToLower: (inputString) => {
    const lowerCaseString = inputString.toLowerCase();
    return lowerCaseString;
  },

  chatWithGPT: async (message) => {
    try {
      const configuration = new Configuration({
        apiKey: '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',
      });

      const openai = new OpenAIApi(configuration);

      const concurrencyLimit = 1;
      const limit = pLimit(concurrencyLimit);
      const response = await limit(() =>
        openai.createCompletion({
          model: 'text-babbage-001',
          prompt: message,
          max_tokens: 300,
        })
      );

      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error occurred:', error);
      ll;
      return 'Oops, something went wrong!';
    }
  },
};
