const express = require("express");
const logger = require("./middlewares/logging");

// Include route files
const productsRoute = require("./routes/products");

const app = express();

// middlewares
app.use(logger);

// Use routes
app.use("/api/products", productsRoute);

app.get("/", (req, res) => {
  res.send("<h1>Hello server from express</h1>");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
