import express from "express";
import { parseRequestBody } from "./middleware/parseRequest";
import blogRouter from "./route/blogsRoute";

const app = express();
const PORT = 3000;

app.use(parseRequestBody);
app.use("/blogs", blogRouter)

app.listen(PORT, () => {
  console.log("Server is runing on port" + PORT);
});


