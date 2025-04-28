import { postModel } from "../models/blogPostModel.js";

export const getPostByUser = async (req, res) => {
  const { id } = req.user;

  try {
    const posts = await postModel
      .find({ author: id })
      .populate("author")
      .sort({ createdAt: -1 });

    if (!posts || posts.length === 0) {
      return res.status(200).json({
        success: true,
        postDataByUser: [],
      });
    }

    const formattedPosts = posts.map((post) => ({
      id: post._id,
      title: post.title,
      content: post.content,
      coverImage: post.coverImage,
      tags: post.tags,
      excerpt: post.excerpt,
      slug: post.slug,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));

    return res.status(200).json({
      success: true,
      postDataByUser: formattedPosts,
    });
  } catch (error) {
    console.error("Error fetching posts by user:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Failed to retrieve posts.",
    });
  }
};
