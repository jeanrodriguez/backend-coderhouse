import { Router } from "express";
import CartManager from "../models/cartsManager.js";
import { __dirnameApp } from "../pathUtil.js";
import {
  sendOkResponse,
  sendNotFoundResponse,
  sendServerErrorResponse,
} from "../utils/httpResponse.js";
import ProductManager from "../models/productsManager.js";

const router = Router();

const cartManager = new CartManager(`${__dirnameApp}/data/carts.json`);
const producManger = new ProductManager(`${__dirnameApp}/data/products.json`);

router.get("/", async (req, res) => {
  const cartList = await cartManager.getCarts();
  sendOkResponse(res, cartList);
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCartById(cid);
  if (!cart) {
    sendNotFoundResponse(res);
  }
  sendOkResponse(res, cart);
});

router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    sendOkResponse(res, newCart);
  } catch (error) {
    sendServerErrorResponse(res);
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartManager.getCartById(cid);
    if (!cart) return sendNotFoundResponse(res);

    const productFound = await producManger.getProductById(pid);
    if (!productFound) return sendNotFoundResponse(res);
    console.log("==kl con klk==");
    const addedPructoToCart = await cartManager.addProductToCart(cart, pid);
    sendOkResponse(res, addedPructoToCart);
  } catch (error) {
    sendServerErrorResponse(res, error);
  }
});

export default router;
