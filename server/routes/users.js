import express from "express";
import { getUser, createUser  } from "../controllers/users.js";
import { getOtherUsers, getFriends, addFriend } from "../controllers/users.js";

const router = express.Router();

/* READ */
router.get("/:name", getUser);
router.get("/friends/:id", getFriends);
router.get("/others/:id", getOtherUsers);

/* UPDATE */
router.patch("/friends/:id/:friendId", addFriend);

/* POST */
router.post("/", createUser);


export default router;