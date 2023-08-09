/** @format */

import mongoose from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const ratingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
  },
});

ratingSchema.plugin(MongooseDelete, { overrideMethods: 'all' });
const RatingModel = mongoose.model('Rating', ratingSchema);
export default RatingModel;
