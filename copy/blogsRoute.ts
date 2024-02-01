import express from "express";
import blogsController from "./blogsController";

const router = express.Router();

router.get("/", blogsController.getAllBlogs);
router.get("/", blogsController.getBlogById);
router.post("/", blogsController.createBlog);
router.put("/:id", blogsController.updateBlog);
router.delete("/:id", blogsController.deleteBlog);

export default router;
