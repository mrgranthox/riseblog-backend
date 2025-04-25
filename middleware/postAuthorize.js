import { postModel } from "../models/blogPostModel.js";


const authorizePostOwner = async (req, res, next) => {

  const post = await postModel.findById(req.params.id);  
  if (!post) {
    return res.status(404).json({ 
      success: false, 
      message: "Post not found" });
  }

  if (post.author.toString() !== req.user.id) {
    return res.status(403).json({ 
      success: false, 
      message: "Not allowed to access this post" });
  }
 
  req.post = post;
  next();
};


export default authorizePostOwner