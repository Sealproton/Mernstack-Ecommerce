import express from "express";
import data from "./data.js";
const app = express();

app.get("/api/products", (req, res) => {
  res.send(data.products); //ส่งข้อมูลจากbackend to front
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost${port}`);
});
