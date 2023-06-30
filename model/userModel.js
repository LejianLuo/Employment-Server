import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    applications:Array
  });
  
  // Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this;
  
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
    }
  
    next();
  });
  
  // Compare the plain text password with the hashed password stored in the database
  userSchema.methods.comparePassword = async function (password,user) {
    return await bcrypt.compare(password, user.password);
  };
  
  
  export const User = mongoose.model('User', userSchema);
  
  