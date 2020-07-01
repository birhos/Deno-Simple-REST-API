import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost,
} from "../controllers/postController.ts";

const router = new Router();

router.get("/api/v1/posts", getPosts)
  .get("/api/v1/posts/:id", getPostById)
  .post("/api/v1/posts", addPost)
  .put("/api/v1/posts/:id", updatePost)
  .delete("/api/v1/posts/:id", deletePost);

export default router;