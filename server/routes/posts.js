import express from "express";
import { getPostsExplore, getPostsHome, getPostsPast, getPostsBookmarks, getPostsPublished, getPostsFriends, 
  createPost, publishPost, updateSchedule, likePost, bookmarkPost, updatePublished } from "../controllers/posts.js";

const router = express.Router();

/* READ */
router.get("/home/:id", getPostsHome);
router.get("/explore/:id", getPostsExplore);
router.get("/friends/:id", getPostsFriends);
router.get("/past/:id", getPostsPast);
router.get("/bookmarks/:id", getPostsBookmarks);
router.get("/published/:id", getPostsPublished);

/* UPDATE */
router.patch("/:id/like", likePost);
router.patch("/:id/bookmark", bookmarkPost);
router.patch("/:id/publish", publishPost);
router.patch("/update/schedule/:id", updateSchedule);
router.patch("/update/published/:id", updatePublished);

/* POST */
router.post("/", createPost);

export default router;