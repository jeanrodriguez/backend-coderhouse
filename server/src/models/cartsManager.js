import { v4 as uuidv4 } from "uuid";
import { writeFile, readFile } from "fs/promises";
import fs from "fs";
import ProductManager from "./productsManager.js";
import { __dirnameApp } from "../pathUtil.js";

const producManger = new ProductManager(`${__dirnameApp}/data/products.json`);

// import { access, constants } from "node:fs/promises";
class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    try {
      if (!fs.existsSync(this.path)) {
        return [];
      }
      const carts = await readFile(this.path, "utf-8");
      if (!carts) return [];
      const cartsToJSON = JSON.parse(carts);
      return cartsToJSON;
    } catch (error) {
      console.log("==error==", error);
    }
  }
  async createCart() {
    try {
      const newCart = { id: uuidv4(), products: [] };
      const cartsList = await this.getCarts();
      cartsList.push(newCart);
      await writeFile(this.path, JSON.stringify(cartsList));
      return newCart;
    } catch (error) {
      console.error("==error==", error);
    }
  }
  async getCartById(id) {
    try {
      const cartsFromFille = await this.getCarts();
      const cartFound = cartsFromFille.find((cart) => cart.id === id);
      if (!cartFound) return null;
      return cartFound;
    } catch (error) {
      console.error("==error==", error);
    }
  }
  async updateCart(id, productToUpdate) {
    try {
      const products = await this.getProducts();
      const productFound = await this.getProductById(id);
      if (!productFound) return null;
      const updatedProduct = { ...productFound, ...productToUpdate };
      const index = products.findIndex((p) => p.id === id);
      products[index] = updatedProduct;
      await writeFile(this.path, JSON.stringify(products));
      return updatedProduct;
    } catch (error) {
      console.error("==error==", error);
    }
  }
  async addProductToCart(cart, productId) {
    try {
      const cartList = await this.getCarts();
      const existProdInCart = cart.products.find(
        (prod) => prod.id === productId
      );
      if (!existProdInCart) {
        const productToCart = {
          id: productId,
          quantity: 1,
        };
        cart.products.push(productToCart);
      } else existProdInCart.quantity += 1;

      const updatedCarts = cartList.map((cartItem) => {
        if (cartItem.id === cart.id) return cart;
        return cartItem;
      });
      await fs.promises.writeFile(this.path, JSON.stringify(updatedCarts));
      return cart;
    } catch (error) {
      console.error("==error==", error);
    }
  }
}

export default CartManager;
