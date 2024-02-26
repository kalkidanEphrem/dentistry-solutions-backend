import express from "express";
import blogRouter from "./route/blogsRoute";
import "dotenv/config";
import { Pool } from "pg";
import { urlencoded } from "body-parser";

const app = express();
const PORT = 5500;
const connectionPoint = process.env.POSTGRES_URL;
console.log(connectionPoint);

const pool = new Pool({
  connectionString: connectionPoint,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use(urlencoded({extended: true}));
app.use(express.json())
app.use("/blogs", blogRouter);

app.listen(PORT, async () => {
  await pool.connect();
  console.log("Server is runing on port" + PORT);
});

export default app;
