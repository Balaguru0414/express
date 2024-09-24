const express = require("express");
const app = express();
const port = 5000;

const teasData = [];
let nextId = 1;
app.use(express.json());

// Create a teas
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newtea = {
    id: nextId++,
    name,
    price,
  };
  teasData.push(newtea);

  res.status(201).json(teasData);
});

// Get all teas
app.get("/teas", (req, res) => {
  res.status(200).send(teasData);
});

// Get tea by id
app.get("/teas/:id", (req, res) => {
  const tea = teasData.find((tea) => tea.id === parseInt(req.params.id));
  if (!tea) {
    res.status(404).send("tea not found");
  } else {
    res.status(200).send(tea);
  }
});

// Update tea by id
app.put("/teas/:id", (req, res) => {
  const tea = teasData.find((tea) => tea.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("tea not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(201).send(tea);
});

// Delete tea by id
app.delete("/teas/:id", (req, res) => {
  const tea = teasData.find((tea) => tea.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("tea not found");
  }
  const index = teasData.indexOf(tea);
  teasData.splice(index, 1);
  res.status(200).send("tea deleted");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
