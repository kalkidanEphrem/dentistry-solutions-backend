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
                return res.status(200).json(blogs);
            }
            catch (error) {
                console.error(error);
                return res.status(500).send("Internal Server Error");
            }
        });
    }
    getBlogById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const blog = yield (0, postgres_1.sql) `SELECT * FROM blogs WHERE id = ${id}`;
                return res.status(200).json(blog);
            }
            catch (error) {
                console.error(error);
                return res.status(404).send("Blog not found");
            }
        });
    }
    createBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, discription, content, author } = req.body;
            try {
                yield (0, postgres_1.sql) `INSERT INTO blogs (title, description, content, author) VALUES (${title}, ${discription}, ${content}, ${author}) RETURNING *`;
                return res.status(201).send("Blog created succesfully");
            }
            catch (error) {
                console.error(error);
                return res.status(500).send("Internal Server Error");
            }
        });
    }
    updateBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { title, content } = req.body;
            try {
                yield (0, postgres_1.sql) `UPDATE blogs SET title = $1, content = $2 WHERE id = $3 RETURNING *, (${title}, ${content}, ${id})`;
                return res.status(200).send("Blog update successfully");
            }
            catch (error) {
                console.error(error);
                return res.status(404).send("Blog not found");
            }
        });
    }
    deleteBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield (0, postgres_1.sql) `DELETE FROM blogs WHERE id = ${id}`;
                return res.status(204).end();
            }
            catch (error) {
                console.error(error);
                return res.status(404).send("Blog not found");
            }
        });
    }
}
exports.default = new BlogController();
