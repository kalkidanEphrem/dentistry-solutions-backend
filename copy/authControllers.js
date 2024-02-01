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
class AuthController {
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield (0, postgres_1.sql) `SELECT * FROM admin`;
                res.status(200).json(users);
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        });
    }
    getUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const user = yield (0, postgres_1.sql) `SELECT * FROM admin WHERE id = ${id}`;
                res.status(200).json(user);
            }
            catch (error) {
                console.error(error);
                res.status(404).send('User not found');
            }
        });
    }
    creatUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, role } = req.body;
            try {
                const newUser = yield (0, postgres_1.sql) `INSERT INTO admin (name, email, password, role) VALUES (${name}, ${email}, ${password}, ${role}) `;
                res.status(200).json(newUser);
            }
            catch (error) {
                console.error(error);
                res.status(505).send('Internal Server Error');
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, email, password, role } = req.body;
            try {
                const updateUser = yield (0, postgres_1.sql) `UPDATE admins SET name = $1, email = $2, password = $3, role = $4 WHERE id = $5 RETURNING *, (${name}, ${email}, ${password}, ${role}, ${id}) `;
                res.status(201).json(updateUser);
            }
            catch (error) {
                console.error(error);
                res.status(404).send('User not found');
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield (0, postgres_1.sql) `DELETE FROM admin WHERE id = $1, ${id}`;
                res.status(204).end();
            }
            catch (error) {
                console.error(error);
                res.status(404).send('Blog not found');
            }
        });
    }
}
exports.default = new AuthController();
