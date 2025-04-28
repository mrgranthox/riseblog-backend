import { userModel } from "../models/blogPostModel.js";

export const allUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find();

    res.status(200).json({
      success: true,
      userLists: allUsers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error. Failed to retrieve users.",
    });
  }
};
