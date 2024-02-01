import bodyParser from "body-parser";
import express from "express";


const app = express();
const PORT = 3000;


app.listen(PORT, () => {
  console.log("Server is runing");
});



app.use(bodyParser.json());


