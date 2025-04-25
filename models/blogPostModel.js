import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  name: { 
    type: String, required: true },
  email: { 
    type: String, required: true, unique: true },
  password: { 
    type: String, required: true, select: false },
  profilePicture: {     
    type: String, default: '' },
  bio: { 
    type: String, default: '' },
  createdAt: { 
    type: Date, default: Date.now },
  verifyOtp: {
    type: String, 
    default: ""
  },
  verifyOtpExpireAt: {
    type: Number, 
    default: 0
  },
  isAccountVerified: {
    type: Boolean, 
    default: false
  },
  resetOtp: {
    type: String, 
    default: ""
  },
  resetOtpExpireAt: {
    type: String, 
    default: 0
  }
}, { timestamps: true });

userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

export const userModel = mongoose.models.User || mongoose.model('User', userSchema);

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coverImage: { type: String, default: '' },
  tags: [{ type: String }],
  published: { type: Boolean, default: true },
  excerpt: {type: String, default:''},
  slug: { type: String, unique: true }

}, { timestamps: true });


 export const postModel = mongoose.models.Post || mongoose.model('Post', postSchema);