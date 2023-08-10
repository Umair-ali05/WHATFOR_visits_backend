/** @format */

import { config } from 'dotenv';

import constants from '../../utils/constants.js';
import commentRepository from '../../repo/comment.js';
import replyRepository from '../../repo/reply-comment.js';
import adminService from '../admin/services.js';
import utils from '../../utils/utils.js';

config();

export default {
  addComment: async (user, blogId, body) => {
    try {
      let { text } = body;
      const getBlogData = await adminService.viewPostByName({ _id: blogId });

      // text = `${text} this statemnt about ${getBlogData.post.placeName} of ${getBlogData.post.placeCity} is true or false, if false give me the reason`;

      // let chatGPTResponse = await utils.chatWithGPT(text);

      // if (!chatGPTResponse.includes(' false')) {
      //   chatGPTResponse = '';
      // }

      const commentData = {
        text,
        // chatGPTResponse,
        userName: user.name,
        place: blogId,
        date: Date.now(),
      };
      await commentRepository.createComment(commentData);

      return {
        success: true,
        message: constants.CREATED,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  replyComment: async (user, body, commentId) => {
    try {
      const { text } = body;
      const commentData = {
        text,
        userName: user.name,
        comment: commentId,
        date: Date.now(),
      };

      await replyRepository.createComment(commentData);

      return {
        success: true,
        message: constants.CREATED,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
};
