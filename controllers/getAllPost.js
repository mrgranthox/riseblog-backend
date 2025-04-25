import { postModel } from "../models/blogPostModel.js"



export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await postModel.find().populate('author')

    return res.status(200).json({
      success: true,
      postLists: allPosts
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error. Failed to retrieve posts."
    });
  }
}