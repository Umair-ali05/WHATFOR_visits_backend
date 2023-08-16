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
      const { text } = body;

      const getBlogData = await adminService.viewPostByName({ _id: blogId });

      const ntext = `Can you evaluate the accuracy of the following claim in yes and no and with reason? ${text}about  ${getBlogData.post.placeName} of ${getBlogData.post.placeCity}.`;

      let chatGPTResponse = await utils.chatWithGPT(ntext);

      const keywords = ['There is no', 'No', 'why', 'false', 'but'];
      const containsKeywords = keywords.some((keyword) =>
        chatGPTResponse.includes(keyword)
      );

      if (!containsKeywords) {
        chatGPTResponse = '';
      }

      const commentData = {
        text,
        chatGPTResponse,

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
  replyComment: async (user, body, commentId, image) => {
    try {
      const { text } = body;
      let replyImageUrl;
      let imageName;
      if (image) {
        imageName = `${Date.now()}-${image.originalname}`;
        replyImageUrl = await utils.uploadFile(image.buffer, imageName);
      }

      const commentData = {
        text,
        replyImageUrl,
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
