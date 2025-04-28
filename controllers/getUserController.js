import { userModel } from "../models/blogPostModel.js";

export const getUserData = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      userData: {
        name: user.name,
        username: user.username,
        profilePicture: user.profilePicture,
        email: user.email,
        bio: user.bio,
        isAccountVerified: user.isAccountVerified,
        resetOtp: user.resetOtp,
        resetOtpExpireAt: user.resetOtpExpireAt,
        verifyOtpExpireAt: user.verifyOtpExpireAt,
        verifyOtp: user.verifyOtp,
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
