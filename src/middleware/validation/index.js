/** @format */

import signUpValidation from './sign-up-validation.js';
import signInValidation from './sign-in-validation.js';
import addBlogValidation from './add-blog-validation.js';
import addCommentValidation from './add-comment-validation.js';

export default {
  signIn: signInValidation,
  signUp: signUpValidation,
  addBlog: addBlogValidation,
  addComment: addCommentValidation,
};
