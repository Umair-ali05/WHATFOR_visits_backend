/** @format */

import { config } from 'dotenv';

import constants from '../../utils/constants.js';
import adminRepository from '../../repo/admin.js';

config();

export default {
  addPost: async (user, image, body) => {
    try {
      const {
        placeType,
        placeName,
        placeDescription,
        placeAddress,
        placeLocation,
      } = body;
      if (user.role !== 'Admin') {
        return { success: false, message: constants.YOU_ARE_NOT_ADMIN };
      }
      //add image to any bucket
      let placeImageUrl;
      const postData = {
        placeType,
        placeName,
        placeDescription,
        placeAddress,
        placeLocation,
        placeImageUrl,
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
  viewPost: async (user, query) => {
    try {
      if (user.role !== 'Admin') {
        return { success: false, message: constants.YOU_ARE_NOT_ADMIN };
      }

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
  viewPosts: async (user, query) => {
    try {
      if (user.role !== 'Admin') {
        return { success: false, message: constants.YOU_ARE_NOT_ADMIN };
      }

      const viewPost = await adminRepository.getPlaces(query);
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
};
