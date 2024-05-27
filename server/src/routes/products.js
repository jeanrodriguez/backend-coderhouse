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
import { isArrayEmpty } from "../utils/index.js";
import { socketServer } from "../app.js";

const router = Router();

const producManger = new ProductManager(`${__dirnameApp}/data/products.json`);

router.get("/", async (req, res) => {
  const { limit } = req.query;
  const productList = await producManger.getProducts(limit);
  sendOkResponse(res, productList);
});

router.get("/:pid", async (req, res) => {
  const product = await producManger.getProductById(req.params.pid);
  if (!product) {
    sendNotFoundResponse(res);
  }
  sendOkResponse(res, product);
});

router.post(
  "/",
  upload.array("thumbnails"),
  validateProduct,
  async (req, res) => {
    try {
      const newProduct = req.body;

      if (req.files && !isArrayEmpty(req.files)) {
        newProduct.thumbnails = [];
        req.files.map((file) => {
          newProduct.thumbnails.push(file.path);
        });
      }
      const savedData = await producManger.createProduct(newProduct);
      socketServer.emit("productCreated", savedData);
      sendOkResponse(res, savedData);
    } catch (error) {
      sendServerErrorResponse(res, error);
    }
  }
);

router.put("/:pid", upload.array("thumbnails"), async (req, res) => {
  try {
    const productToUpdate = req.body;

    if (req.files && !isArrayEmpty(req.files)) {
      productToUpdate.thumbnails = [];
      req.files.map((file) => {
        productToUpdate.thumbnails.push(file.path);
      });
    }

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
    socketServer.emit("productDeleteById", req.params.pid);
    sendOkResponse(res, deletedProduct);
  } catch (error) {
    sendServerErrorResponse(res, error);
  }
});

export default router;
