import jwt from "jsonwebtoken";
import { userModel } from "../models/blogPostModel.js";
import bcrypt from "bcryptjs";
import {
  EMAIL_VERIF_TEMPLATE,
  PASSWORD_RESET_TEMPLATE,
} from "../config/emailTemplate.js";
import transporter from "../config/nodemailer.js";
import { cloudinary } from "../config/cloudinary.js";

export const updateProfile = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ FILE:", req.file);
    console.log("REQ USER:", req.user);

    const { name, bio } = req.body;
    const userId = req.user.id;

    const updateData = { name, bio };

    if (req.file?.path) {
      updateData.profilePicture = req.file.path;
    }

    const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({
      success: false,
      message: "Missing details",
    });
  }

  try {
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.json({
        success: false,
        message: "Email already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new userModel({ name, email, password: hashedPassword });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "2d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Account registered successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password required",
    });
  }

  try {
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.json({
        success: false,
        message: "Email doesn't exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid or wrong password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "2d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Logged in successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const sendVerifyOtp = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await userModel.findById(id);

    if (user.isAccountVerified) {
      return res.json({
        success: false,
        message: "Account already verified",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "RISEBLOG Account Verification OTP",
      html: EMAIL_VERIF_TEMPLATE.replace("{{otp}}", otp),
    };
    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "Verification sent successfully. Check mailbox",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send otp. Try again",
      error: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { otp } = req.body;
  const { id } = req.user;

  if (!id || !otp) {
    return res.json({
      success: false,
      message: "Missing details",
    });
  }

  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({
        success: false,
        message: "Ivalid otp",
      });
    }
    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({
        success: false,
        message: "Opt Expired",
      });
    }
    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();

    return res.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const isAuthenticatd = async (req, res) => {
  try {
    return res.json({
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "RISEBLOG Password Reset Otp",
      html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp),
    };
    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "Otp sent to mailbox",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (user.resetOtp === otp) {
      return res.json({
        success: true,
        message: "OTP verified successfully",
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid OTP",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    {
      return res.json({
        success: false,
        message: "Email, otp and new password required",
      });
    }
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "user not found",
      });
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({
        success: false,
        message: "OTP expired",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    await user.save();

    return res.json({
      success: true,
      message: "Password resetted successfully",
    });
  } catch (error) {
    {
      return res.json({
        success: false,
        message: error.message,
      });
    }
  }
};
