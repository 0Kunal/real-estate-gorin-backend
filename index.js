const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());

app.use(express.json());

let properties = [];
let nextId = 1;

app.get("/properties", (req, res) => {
  res.json(properties);
});

app.post("/properties", (req, res) => {
  const { title } = req.body;
  properties.push({ id: nextId, title: title });
  nextId++;
  res.json(properties);
});

app.put("/properties/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title } = req.body;
  const property = properties.find((property) => property.id === id);
  property.title = title;
  res.json(properties);
});

app.delete("/properties/:id", (req, res) => {
  const id = parseInt(req.params.id);
  properties = properties.filter((property) => property.id !== id);
  res.json(properties);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
