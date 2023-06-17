import express from "express";
import { getUser, createUser  } from "../controllers/users.js";

const router = express.Router();

/* READ */
router.get("/:name", getUser);

/* UPDATE */


/* POST */
router.post("/", createUser);


export default router;