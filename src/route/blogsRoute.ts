import express from "express";
import blogsController from "../controller/blogsController";

//blogs router
const blogRouter = express.Router();

blogRouter.get("/", blogsController.getAllBlogs);
blogRouter.get("/:id", blogsController.getBlogById);
blogRouter.post("/", blogsController.createBlog);
blogRouter.put("/:id", blogsController.updateBlog);
blogRouter.delete("/:id", blogsController.deleteBlog);

export default blogRouter;