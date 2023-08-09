/** @format */

import mongoose from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const categorySchema = new mongoose.Schema({
  categoryImageUrl: {
    type: String,
  },
  category: {
    type: String,
  },
});

categorySchema.plugin(MongooseDelete, { overrideMethods: 'all' });
const CategoryModel = mongoose.model('Category', categorySchema);
export default CategoryModel;
