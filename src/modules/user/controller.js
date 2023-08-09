/** @format */

import { config } from 'dotenv';

import UserService from './services.js';

config();

export default {
  signUpUser: async (req, res) => {
    try {
      const { body } = req;

      const response = await UserService.signUpUser(body);
      return !response.success
        ? res.status(400).json({ err: response })
        : res.status(200).json({ user: response });
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },
  signInUser: async (req, res) => {
    try {
      const { body } = req;

      const response = await UserService.signInUser(body);
      return !response.success
        ? res.status(400).json({ err: response })
        : res.status(200).json({ profile: response });
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { body } = req;
      const { user } = req.user;

      const response = await UserService.updateUser(user, body);

      return !response.success
        ? res.status(400).json({ err: response })
        : res.status(200).json({ profile: response });
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },
};
