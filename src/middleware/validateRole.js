import { config } from 'dotenv';
import constants from '../utils/constants';

config();

export default {
  admin: (req, res, next) => {
    const { ADMIN_AUTH_KEY } = process.env;
    const { headers } = req;
    if (headers.admin_auth_key !== ADMIN_AUTH_KEY) {
      return res.status(401).json({ message: constants.ROLE_ERROR });
    }
    return next();
  },
};
