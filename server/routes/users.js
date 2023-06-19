import express from "express";
import { getUser, createUser  } from "../controllers/users.js";
import { getOtherUsers, getFriends, addFriend, getUserRequests, sendReq, removeReq } from "../controllers/users.js";

const router = express.Router();

/* READ */
router.get("/:name", getUser);
router.get("/friends/:id", getFriends);
router.get("/others/:id", getOtherUsers);
router.get("/request/:id", getUserRequests);

/* UPDATE */
router.patch("/friends/:id/:friendId", addFriend);
router.patch("/request", sendReq);
router.patch("/request/:id", removeReq);

/* POST */
router.post("/", createUser);


export default router;