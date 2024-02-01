"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("@vercel/postgres");
class BlogController {
    getAllBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogs = yield (0, postgres_1.sql) `SELECT * FROM blogs`;
                res.status(200).json(blogs);
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        });
    }
    getBlogById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const blog = yield (0, postgres_1.sql) `SELECT * FROM blogs WHERE id = ${id}`;
                res.status(200).json(blog);
            }
            catch (error) {
                console.error(error);
                res.status(404).send('Blog not found');
            }
        });
    }
    createBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, discription, content, author } = req.body;
            try {
                const newBlog = yield (0, postgres_1.sql) `INSERT INTO blogs (title, description, content, author) VALUES (${title}, ${discription}, ${content}, ${author}) RETURNING *`;
                res.status(201).json(newBlog);
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        });
    }
    updateBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { title, content } = req.body;
            try {
                const updatedBlog = yield (0, postgres_1.sql) `UPDATE blogs SET title = $1, content = $2 WHERE id = $3 RETURNING *, (${title}, ${content}, ${id})`;
                res.status(200).json(updatedBlog);
            }
            catch (error) {
                console.error(error);
                res.status(404).send('Blog not found');
            }
        });
    }
    deleteBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield (0, postgres_1.sql) `DELETE FROM blogs WHERE id = $1', ${id}`;
                res.status(204).end();
            }
            catch (error) {
                console.error(error);
                res.status(404).send('Blog not found');
            }
        });
    }
}
exports.default = new BlogController();
