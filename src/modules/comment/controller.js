/** @format */

import { config } from 'dotenv';
import commentService from './services.js';

config();

export default {
  addComment: async (req, res) => {
    try {
      const { user } = req.user;
      const { body } = req;
      const { blogId } = req.params;

      const response = await commentService.addComment(user, blogId, body);
      return !response.success
        ? res.status(400).json({ err: response })
        : res.status(200).json({ post: response });
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },
  replyComment: async (req, res) => {
    try {
      const { user } = req.user;
      const { body } = req;
      const { commentId } = req.params;

      const response = await commentService.replyComment(user, body, commentId);
      return !response.success
        ? res.status(400).json({ err: response })
        : res.status(200).json({ post: response });
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },
};
