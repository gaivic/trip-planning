import express from "express";
import { getPostsExplore, getPostsHome, getPostsPast, getPostsBookmarks, getPostsPublished, createPost, publishPost, updateSchedule } from "../controllers/posts.js";

const router = express.Router();

/* READ */
router.get("/home/:id", getPostsHome);
router.get("/explore", getPostsExplore);
router.get("/past/:id", getPostsPast);
router.get("/bookmarks/:id", getPostsBookmarks);
router.get("/published/:id", getPostsPublished);

/* UPDATE */
// router.patch("/:id/like", likePost);
router.patch("/:id/publish", publishPost);
router.patch("/update/schedule/:id", updateSchedule);

/* POST */
router.post("/", createPost);

export default router;