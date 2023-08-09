/** @format */

import { config } from 'dotenv';
import AdminService from './services.js';

config();

export default {
  addCategory: async (req, res) => {
    try {
      const { user } = req.user;
      const { body } = req;
      const { file } = req;

      const response = await AdminService.addCategory(user, file, body);

      return !response.success
        ? res.status(400).json({ err: response })
        : res.status(200).json({ post: response });
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },
  viewCategories: async (req, res) => {
    try {
      const response = await AdminService.viewCategories();

      return !response.success
        ? res.status(400).json({ err: response })
        : res.status(200).json({ posts: response });
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },
  addPost: async (req, res) => {
    try {
      const { user } = req.user;
      const { body } = req;
      const { file } = req;
      console.log(file, body);
      const response = await AdminService.addPost(user, file, body);

      return !response.success
        ? res.status(400).json({ err: response })
        : res.status(200).json({ post: response });
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },
  viewPost: async (req, res) => {
    try {
      const { id } = req.params;

      const response = await AdminService.viewPost(id);
      console.log(response);
      return !response.success
        ? res.status(400).json({ err: response })
        : res.status(200).json({ post: response });
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },
  viewPostByName: async (req, res) => {
    try {
      console.log(req.params);
      const { placeType, placeName } = req.params;

      const response = await AdminService.viewPostByName({
        placeType,
        placeName,
      });
      return !response.success
        ? res.status(400).json({ err: response })
        : res.status(200).json({ post: response });
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },
  viewPosts: async (req, res) => {
    try {
      const { type } = req.params;

      const response = await AdminService.viewPosts({ placeType: type });

      return !response.success
        ? res.status(400).json({ err: response })
        : res.status(200).json({ posts: response });
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },
  updatePost: async (req, res) => {
    try {
      const { user } = req.user;
      const { id } = req.params;
      const { body } = req;

      const response = await AdminService.updatePost(user, id, body);
      return !response.success
        ? res.status(400).json({ err: response })
        : res.status(200).json({ post: response });
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },
  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      const { user } = req.user;

      const response = await AdminService.deletePost(user, { _id: id });
      return !response.success
        ? res.status(400).json({ err: response })
        : res.status(200).json({ post: response });
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },
  addRating: async (req, res) => {
    try {
      const { id } = req.params;
      const { user } = req.user;
      const { body } = req;

      const response = await AdminService.addRating(id, user, body);
      return !response.success
        ? res.status(400).json({ err: response })
        : res.status(200).json({ post: response });
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },
  approveComments: async (req, res) => {
    try {
      const { body } = req;

      const response = await UserService.approvedComments(body);
      return response.err
        ? res.status(400).json({ err: response.err })
        : res.status(200).json({ approvedComments: response });
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },
};
