/** @format */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import MongooseDelete from 'mongoose-delete';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String },
    email: String,
    role: {
      type: String,
      enum: ['User', 'Admin'],
      default: 'User',
    },
    profilePicture: { type: String, required: false },
    otp: { type: Number },
  },
  {
    versionKey: false,
    // eslint-disable-next-line comma-dangle
  },
);

UserSchema.plugin(MongooseDelete, { overrideMethods: 'all' });
const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
