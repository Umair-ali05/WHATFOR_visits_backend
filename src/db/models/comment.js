/** @format */

import mongoose from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: true,
  },
  chatGPTResponse: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  // each comment can only relates to one blog, so it's not in array
  userName: {
    type: String,
  },
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
  },
  reply: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ReplyComment' }],
});

commentSchema.plugin(MongooseDelete, { overrideMethods: 'all' });
const CommentModel = mongoose.model('Comment', commentSchema);
export default CommentModel;
