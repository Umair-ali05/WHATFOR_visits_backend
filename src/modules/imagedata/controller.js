/** @format */

import { config } from 'dotenv';
import AdminService from './services.js';

config();

export default {
  getImage: async (req, res) => {
    try {
      const { imageName } = req.params;
      const response = await AdminService.viewPosts(imageName);

      return !response.success
        ? res.status(400).json({ err: response })
        : res.status(200).download(response.imagePath);
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },
};
