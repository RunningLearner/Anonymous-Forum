import { Router } from "express";
import { createPost, getAllPost, getPost, updatePost, deletePost } from "../posts/postsController";

export const path = "/posts";
export const router = Router();

router.post("/", createPost);
router.get("/", getAllPost);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
