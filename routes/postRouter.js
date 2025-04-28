import express from "express";
import postAuth from "../middleware/postAuth.js";
import {
  createPost,
  deletePost,
  editPost,
  getPostBySlug,
} from "../controllers/postController.js";
import authorizePostOwner from "../middleware/postAuthorize.js";
import upload from "../middleware/imageUpload.js";
import userAuth from "../middleware/userAuth.js";
import { getPostByUser } from "../controllers/getPostByUser.js";
import { getAllPosts } from "../controllers/getAllPost.js";
import { getSinglePostById } from "../controllers/getUserByPostController.js";

const postRouter = express.Router();

postRouter.post(
  "/create-post",
  postAuth,
  upload.single("coverImage"),
  createPost
);
postRouter.delete("/delete-post/:id", postAuth, authorizePostOwner, deletePost);
postRouter.get("/user-posts", userAuth, getPostByUser);
postRouter.get("/posts", getAllPosts);
postRouter.get("/posts/:slug", getPostBySlug);
postRouter.patch(
  "/edit-post/:id",
  postAuth,
  upload.single("coverImage"),
  authorizePostOwner,
  editPost
);
postRouter.get("/get-user-by-post/:id", getSinglePostById);

export default postRouter;
