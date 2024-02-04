"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogsController_1 = __importDefault(require("../controller/blogsController"));
//blogs router
const router = express_1.default.Router();
router.get("/", blogsController_1.default.getAllBlogs);
router.get("/", blogsController_1.default.getBlogById);
router.post("/", blogsController_1.default.createBlog);
router.put("/:id", blogsController_1.default.updateBlog);
router.delete("/:id", blogsController_1.default.deleteBlog);
exports.default = router;
