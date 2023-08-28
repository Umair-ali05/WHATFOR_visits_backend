/** @format */

import { config } from 'dotenv';
import { Bard } from 'googlebard';
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

      const nntext = `${getBlogData.post.placeName} ${getBlogData.post.placeType} located in ${getBlogData.post.placeCountry}, ${getBlogData.post.placeCity}, ${text}, this statement, is true or false ,  if false what will be the reason `;
      let chatGPTResponse;
      // if (getBlogData.post.placeType === 'MUSEUM') {
      //   const COOKIE = process.env.COOKIE;
      //   let myBard = new Bard(`__Secure-1PSID=${COOKIE}`);

      //   console.log(await myBard.ask('Hello world!'));
      //   console.log(
      //     await myBard
      //       .ask('Hello, world!')
      //       .catch((err) => console.log(err.message))
      //   );
      // } else {
      chatGPTResponse = await utils.chatWithGPT(nntext);

      const keywords = ['There is no', 'No', 'why', 'False', 'false', 'but'];
      const containsKeywords = keywords.some((keyword) =>
        chatGPTResponse.includes(keyword)
      );

      if (!containsKeywords) {
        chatGPTResponse = '';
      }
      // }
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
