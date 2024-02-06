"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const parseRequest_1 = require("./middleware/parseRequest");
const blogsRoute_1 = __importDefault(require("./route/blogsRoute"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(parseRequest_1.parseRequestBody);
app.use("/blogs", blogsRoute_1.default);
app.listen(PORT, () => {
    console.log("Server is runing on port" + PORT);
});
