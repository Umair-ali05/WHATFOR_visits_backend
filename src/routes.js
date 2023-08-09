/** @format */

import express from 'express';
import { config } from 'dotenv';

import UserController from './modules/user/controller.js';
import adminController from './modules/admin/controller.js';
import commentController from './modules/comment/controller.js';
import validate from './middleware/validation/index.js';
import auth from './middleware/auth.js';
import getImage from './modules/imagedata/controller.js';
// import FileController from './modules/file/controller';
// import packageController from './modules/package/controller';
// import validator from './middleware/validation/package_validation';
// import role from './middleware/validateRole';

config();
const router = express.Router();

router.post('/sign-up', validate.signUp, UserController.signUpUser);
router.post('/sign-in', validate.signIn, UserController.signInUser);
router.put('/user', auth, UserController.updateUser);
router.post('/blog', auth, validate.addBlog, adminController.addPost);
router.get('/blog/:id', adminController.viewPost);
router.get('/blogs/:placeType/:placeName', adminController.viewPostByName);
router.get('/blogs/:type', adminController.viewPosts);
router.put('/blog/:id', auth, adminController.updatePost);
router.delete('/blog/:id', auth, adminController.deletePost);
router.put('/rating/:id', auth, adminController.addRating);
router.post('/category', auth, adminController.addCategory);
router.get('/category', adminController.viewCategories);

router.post(
  '/comment/:blogId',
  auth,
  validate.addComment,
  commentController.addComment
);
router.post(
  '/reply-comment/:commentId',
  auth,
  validate.addComment,
  commentController.replyComment
);

router.get('/get-image/:imageName', getImage.getImage);

// router.put(
//   '/update-profile',
//   auth,

//   UserController.updateUserProfile
// );

router.use('*', (req, res) => {
  res.status(404).json({
    code: "404 : page not found'",
  });
});
export default router;
