import { v4 as uuidv4 } from "uuid";
import { writeFile, readFile } from "fs/promises";
import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts(limit) {
    try {
      if (!fs.existsSync(this.path)) {
        return [];
      }
      const productsFromFille = await readFile(this.path, "utf8");
      if (!productsFromFille) return [];
      if (limit) return JSON.parse(productsFromFille).slice(0, limit);
      return JSON.parse(productsFromFille);
    } catch (error) {
      console.log("==error==", error);
    }
  }
  async getProductById(id) {
    try {
      const productsFromFille = await this.getProducts();

      const productFound = productsFromFille.find(
        (product) => product.id === id
      );
      if (!productFound) return null;
      return productFound;
    } catch (error) {
      console.log("==error==", error);
    }
  }
  async createProduct(product) {
    try {
      const newProduct = { id: uuidv4(), status: true, ...product };
      const products = await this.getProducts();
      products.push(newProduct);
      await writeFile(this.path, JSON.stringify(products));
      return newProduct;
    } catch (error) {
      console.log("==error==", error);
    }
  }
  async updateProduct(id, productToUpdate) {
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
      console.log("==error==", error);
    }
  }
  async deleteProduct(id) {
    const products = await this.getProducts();
    if (!products) return null;

    const productFound = await this.getProductById(id);
    if (!productFound) return null;

    const filteredProducts = products.filter((u) => u.id !== id);
    await fs.promises.writeFile(this.path, JSON.stringify(filteredProducts));
    return productFound;
  }
}

export default ProductManager;
