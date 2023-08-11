/** @format */

import { config } from 'dotenv';

import constants from '../../utils/constants.js';
import adminRepository from '../../repo/admin.js';
import commentRepository from '../../repo/comment.js';
import replyCommentRepository from '../../repo/reply-comment.js';
import ratingRepository from '../../repo/rating.js';
import categoryRepository from '../../repo/category.js';
import { Storage } from '@google-cloud/storage';
import path from 'path';
import { fileURLToPath } from 'url';
import utils from '../../utils/utils.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

config();

export default {
  addCategory: async (user, image, body) => {
    try {
      let { category } = body;
      let categoryImageUrl;
      let imageName;
      const checkCategory = await categoryRepository.getCategories({
        category,
      });
      if (checkCategory.length === 1) {
        return {
          success: false,
          message: constants.CATEGORY_ALREADY_EXIST,
        };
      }
      if (user.role !== 'Admin') {
        return { success: false, message: constants.YOU_ARE_NOT_ADMIN };
      }
      if (!category) {
        return {
          success: false,
          message: `category ${constants.MISSING_VALUE}`,
        };
      }
      category = utils.removeWhiteSpaceAndCapitalEachLetter(category);
      if (!image) {
        return {
          success: false,
          message: `image ${constants.MISSING_VALUE}`,
        };
      }

      imageName = `${Date.now()}-${image.originalname}`;
      categoryImageUrl = await utils.uploadFile(image.buffer, imageName);
      const categoryData = {
        categoryImageUrl,
        category,
      };
      await categoryRepository.createCategory(categoryData);
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
  viewCategories: async () => {
    try {
      const viewPost = await categoryRepository.getCategories();
      if (viewPost.length === 0) {
        return {
          success: false,
          message: constants.RECORD_NOT_FOUND,
        };
      }

      return {
        success: true,
        post: viewPost,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  addPost: async (user, image, body) => {
    try {
      const {
        placeType,
        placeName,
        placeDescription,
        placeAddress,
        placeCity,
        placeCountry,
        recommendation,
      } = body;
      let placeImageUrl;
      let imageName;
      if (user.role !== 'Admin') {
        return { success: false, message: constants.YOU_ARE_NOT_ADMIN };
      }
      imageName = `${Date.now()}-${image.originalname}`;
      placeImageUrl = await utils.uploadFile(image.buffer, imageName);
      const postData = {
        placeCountry,
        placeCity,
        placeType,
        placeName,
        placeDescription,
        recommendation,
        placeAddress,
        placeImageUrl,
        imageName,
      };

      await adminRepository.createPlace(postData);
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
  viewPost: async (id) => {
    try {
      let replyCommentArray = [];
      const viewPost = await adminRepository.getPlace({ _id: id });
      const commentsOnPost = await commentRepository.getComments({ place: id });

      for (const item of commentsOnPost) {
        const replyComment = await replyCommentRepository.getReplyComments({
          comment: item._id,
        });
        item.reply = replyComment;
        replyCommentArray.push(item);
      }
      viewPost.comments = replyCommentArray;

      if (!viewPost) {
        return {
          success: false,
          message: constants.RECORD_NOT_FOUND,
        };
      }
      return {
        success: true,
        post: viewPost,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  viewPostByName: async (query) => {
    try {
      const viewPost = await adminRepository.getPlace(query);

      if (!viewPost) {
        return {
          success: false,
          message: constants.RECORD_NOT_FOUND,
        };
      }

      return {
        success: true,
        post: viewPost,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  viewPosts: async (query) => {
    try {
      const aggregation = [
        {
          $match: query,
        },
        {
          $sort: {
            totalStars: -1,
          },
        },
        {
          $group: {
            _id: '$pid',
            recommended: {
              $push: {
                $cond: {
                  if: {
                    $eq: ['$recommendation', 'Important'],
                  },
                  then: '$$ROOT',
                  else: '$$REMOVE',
                },
              },
            },
            general: {
              $push: {
                $cond: {
                  if: {
                    $eq: ['$recommendation', 'General'],
                  },
                  then: '$$ROOT',
                  else: '$$REMOVE',
                },
              },
            },
          },
        },
      ];
      const viewPost = await adminRepository.getPlacesWithAggregations(
        aggregation
      );
      if (viewPost.length === 0) {
        return {
          success: false,
          message: constants.RECORD_NOT_FOUND,
        };
      }
      return {
        success: true,
        post: viewPost,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  updatePost: async (user, id, body) => {
    try {
      if (user.role !== 'Admin') {
        return { success: false, message: constants.YOU_ARE_NOT_ADMIN };
      }
      const checkRecord = await adminRepository.updatePlace({ _id: id }, body);
      if (!checkRecord) {
        return {
          success: false,
          message: constants.RECORD_NOT_MODIFIED,
        };
      }
      return {
        success: true,
        message: constants.UPDATED,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  deletePost: async (user, id) => {
    try {
      if (user.role !== 'Admin') {
        return { success: false, message: constants.YOU_ARE_NOT_ADMIN };
      }
      const checkRecord = await adminRepository.deletePlace({ _id: id });
      if (checkRecord.matchedCount === 0) {
        return {
          success: false,
          message: constants.RECORD_NOT_FOUND,
        };
      }
      if (checkRecord.modifiedCount === 0) {
        return {
          success: false,
          message: constants.ALREADY_DELETED,
        };
      }

      return {
        success: true,
        message: constants.DELETED,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  addRating: async (id, user, body) => {
    try {
      const checkAlreadyRated = await ratingRepository.viewRating({
        user: user._id,
        place: id,
      });
      if (!checkAlreadyRated) {
        const done = await ratingRepository.createRating({
          user: user._id,
          place: id,
        });
        if (done) {
          const checkRating = await adminRepository.getPlace({ _id: id });
          let user = checkRating.totalUser + 1;
          let star = (checkRating.totalStars + body.totalStars) / user;
          checkRating.totalUser = user;
          checkRating.totalStars = star;
          await checkRating.save();
        }
        return {
          success: true,
          message: constants.CREATED,
        };
      }
      return {
        success: false,
        message: constants.ALREADY_RATED,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
};
