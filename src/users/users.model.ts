import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;
import User from './users.interface';
import config from '../config';

const userModel = new Schema<User>({
  userId: {
    type: Number,
    required: true,
    unique: true,
    message: 'User id is required',
  },

  username: { type: String, required: true, message: 'Name is required' },
  password: { type: String, required: true, message: 'Password is required' },
  fullName: {
    type: Object,
    required: true,
    firstName: {
      type: String,
      required: true,
      message: 'First Name is required',
    },
    lastName: {
      type: String,
      required: true,
      message: 'Last Name is required',
    },
  },
  age: { type: Number, required: true, message: 'Age is required' },
  email: {
    type: String,
    unique: true,
    required: true,
    message: 'Email is required',
  },
  isActive: { type: Boolean, default: true },
  orders: { type: Array, default: [] },
  hobbies: [{ type: String }],
  address: {
    type: Object,
    required: true,
    street: { type: String, required: true, message: 'Street is required' },
    city: { type: String, required: true, message: 'City is required' },
    country: { type: String, required: true, message: 'Country is required' },
  },
});

userModel.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this?.password,
    Number(config.BCRYPT_ROUNDS),
  );
  next();
});

const user = mongoose.model<User>('User', userModel);
export default user;
