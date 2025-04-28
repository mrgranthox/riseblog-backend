import { postModel } from "../models/blogPostModel.js";

export const getSinglePostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postModel
      .findById(id)
      .populate("author", "name username profilepicture email");
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
