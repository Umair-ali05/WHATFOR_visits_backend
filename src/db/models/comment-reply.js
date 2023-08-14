/** @format */

import mongoose from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const replyCommentSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: true,
  },
  replyImageUrl: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // each comment can only relates to one blog, so it's not in array
  userName: {
    type: String,
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
});

replyCommentSchema.plugin(MongooseDelete, { overrideMethods: 'all' });
const ReplyCommentModel = mongoose.model('ReplyComment', replyCommentSchema);
export default ReplyCommentModel;
