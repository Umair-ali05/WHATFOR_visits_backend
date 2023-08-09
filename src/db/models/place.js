/** @format */

import mongoose from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const placeSchema = new mongoose.Schema({
  placeType: {
    type: String,
  },
  placeImageUrl: {
    type: String,
  },
  imageName: {
    type: String,
  },
  placeName: {
    type: String,
  },
  placeDescription: {
    type: String,
  },
  placeCountry: {
    type: String,
  },
  placeCity: {
    type: String,
  },
  placeAddress: {
    type: String,
  },
  recommendation: {
    type: String,
    enum: ['Important', 'General'],
    default: 'Gemeral',
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  totalUser: {
    type: Number,
    default: 0,
  },
  totalStars: {
    type: Number,
    default: 0,
  },
  // each comment can only relates to one blog, so it's not in array
});

placeSchema.plugin(MongooseDelete, { overrideMethods: 'all' });
const PlaceModel = mongoose.model('Place', placeSchema);
export default PlaceModel;
