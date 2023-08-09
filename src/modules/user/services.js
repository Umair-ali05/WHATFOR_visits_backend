/** @format */

import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

import constants from '../../utils/constants.js';
import userRepository from '../../repo/user.js';
import utils from '../../utils/utils.js';

// import sendMail from '../../helper/sendMail';
import bcrypt from 'bcrypt';

config();

export default {
  signUpUser: async (body) => {
    // const subject = 'otp for user registration';

    let { name, email, password, role, adminKey } = body;

    try {
      if (!role) {
        return { success: false, message: constants.SELECT_ROLE };
      }
      if (utils.checkWhiteSpaces(password)) {
        return { success: false, message: constants.PASSWORD_HAS_WHTIE_SPACES };
      }
      if (role === 'Admin') {
        if (adminKey !== process.env.ADMIN_AUTH_KEY) {
          return { success: false, message: constants.UNAUTH_ADMIN };
        }
      }

      const checkIfNoUserExist = await userRepository.getUsersData({});
      if (!checkIfNoUserExist.length) {
        role = 'Admin';
      }
      email = utils.covertToLower(email);
      name = utils.removeWhiteSpaceAndCapitalFirstLetter(name);

      const alreadyUser = await userRepository.getUserData({ email });

      if (alreadyUser) {
        return { success: false, message: constants.ALREADY_EMAIL_EXIST };
      }

      password = await bcrypt.hash(password, 10);

      const otp = Math.floor(100000 + Math.random() * 900000);
      const userData = {
        role,
        name,
        email,
        otp,
        password,
      };
      const createUser = await userRepository.createUser(userData);
      if (createUser) {
        // sendMail(email, otp, subject);
        return {
          success: true,
          message: constants.CREATED,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  signInUser: async (body) => {
    let { email, password } = body;
    try {
      email = utils.covertToLower(email);
      if (utils.checkWhiteSpaces(password)) {
        return { success: false, message: constants.PASSWORD_HAS_WHTIE_SPACES };
      }
      const user = await userRepository.getUserData({ email });
      if (!user) {
        return { success: false, message: constants.WRONG_EMAIL };
      }

      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) {
        return {
          success: false,
          message: constants.WRONG_PASSWORD,
        };
      }
      var token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRY_TIME,
      });
      return {
        success: 'true',
        message: constants.LOGIN,
        user: `JWT ${token}`,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  updateUser: async (loginUser, body) => {
    try {
      const { name, role, adminKey } = body;

      if (!name && !role) {
        return { success: false, message: constants.RECORD_NOT_MODIFIED };
      }
      if (!name) {
        delete body.name;
      }

      if (!role) {
        delete body.role;
      }
      if (!loginUser) {
        return { success: false, message: constants.PLEASELOGIN };
      }

      if (role === 'Admin') {
        if (loginUser.role === 'Admin') {
          return { success: false, message: constants.ALREADY_ADMIN };
        }
        if (adminKey !== process.env.ADMIN_AUTH_KEY) {
          return { success: false, message: constants.UNAUTH_ADMIN };
        }
        delete body.adminKey;
      }

      if (body.password) {
        body.password = await bcrypt.hash(password, 10);
      }

      const user = await userRepository.updateUser(
        { _id: loginUser._id },
        body
      );
      if (!user) {
        return {
          success: false,
          message: constants.RECORD_NOT_MODIFIED,
        };
      }
      var token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRY_TIME,
      });
      return {
        success: 'true',
        message: constants.USER_UPDATED_SUCCESSFULLY,
        user: `JWT ${token}`,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
};
