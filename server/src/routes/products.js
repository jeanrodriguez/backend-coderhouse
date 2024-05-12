import { Router } from "express";
import ProductManager from "../models/productsManager.js";
import { __dirnameApp } from "../pathUtil.js";
import {
  sendNotFoundResponse,
  sendOkResponse,
  sendServerErrorResponse,
} from "../utils/httpResponse.js";
import { upload } from "../middlewares/multer.js";
import { validateProduct } from "../middlewares/validateProduct.js";

const router = Router();

const producManger = new ProductManager(`${__dirnameApp}/data/products.json`);

router.get("/", async (req, res) => {
  const productList = await producManger.getProducts();
  sendOkResponse(res, productList);
});

router.get("/:pid", async (req, res) => {
  const product = await producManger.getProductById(req.params.pid);
  if (!product) {
    sendNotFoundResponse(res);
  }
  sendOkResponse(res, product);
});

router.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    console.log("==newProduct==", newProduct);
    const savedData = await producManger.createProduct(newProduct);
    sendOkResponse(res, savedData);
  } catch (error) {
    sendServerErrorResponse(res, error);
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const productToUpdate = req.body;
    const savedData = await producManger.updateProduct(
      req.params.pid,
      productToUpdate
    );
    sendOkResponse(res, savedData);
  } catch (error) {
    sendServerErrorResponse(res, error);
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const deletedProduct = await producManger.deleteProduct(req.params.pid);
    if (!deletedProduct) sendNotFoundResponse(res);
    sendOkResponse(res, deletedProduct);
  } catch (error) {
    sendServerErrorResponse(res, error);
  }
});

export default router;
