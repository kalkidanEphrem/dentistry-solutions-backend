"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogsController_1 = __importDefault(require("../controller/blogsController"));
//blogs router
const blogRouter = express_1.default.Router();
blogRouter.get("/", blogsController_1.default.getAllBlogs);
blogRouter.get("/:id", blogsController_1.default.getBlogById);
blogRouter.post("/", blogsController_1.default.createBlog);
blogRouter.put("/:id", blogsController_1.default.updateBlog);
blogRouter.delete("/:id", blogsController_1.default.deleteBlog);
exports.default = blogRouter;
