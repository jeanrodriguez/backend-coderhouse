import express from "express";
import { Server } from "socket.io";

import { engine } from "express-handlebars";
import logger from "./middlewares/logging.js";
import productsRoute from "./routes/products.js";
import cartsRoute from "./routes/carts.js";
import { __dirnameApp } from "./pathUtil.js";
import ProductManager from "./models/productsManager.js";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirnameApp}/views`);
app.use(logger);

// Use routes
app.use("/api/products", productsRoute);
app.use("/api/carts", cartsRoute);
const producManger = new ProductManager(`${__dirnameApp}/data/products.json`);

app.get("/", async (req, res) => {
  const productList = await producManger.getProducts();

  res.render("index", {
    products: productList,
  });
});

app.get("/products", async (req, res) => {
  const productList = await producManger.getProducts();

  res.render("index", {
    products: productList,
  });
});

app.get("/products/realTimeProducts", async (req, res) => {
  const productList = await producManger.getProducts();
  res.render("realTimeProducts", {
    products: productList,
  });
});

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export const socketServer = new Server(server);

socketServer.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});
