import express from "express";
import logger from "./middlewares/logging.js";
import productsRoute from "./routes/products.js";
import cartsRoute from "./routes/carts.js";
import bodyParser from "body-parser";

const app = express();

// middlewares
app.use(express.json());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Use routes
app.use("/api/products", productsRoute);
app.use("/api/carts", cartsRoute);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
