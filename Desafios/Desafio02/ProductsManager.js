import fs from "fs";

class ProductsManager {
    #filePath;
    #lastId = 0;

    constructor(filePath = "./products.json") {
        this.#filePath = filePath;
        this.#setLastId();
    }

    async addProduct(name, price, description = '') {
        try {
            if (!name || !price) {
                throw new Error("Missing data.");
            }

            const products = await this.getProducts();

            if (products.find((product) => product.name === name)) {
                throw new Error("Product already exists.");
            }

            const newProduct = {
                name,
                price,
                description,
                id: ++this.#lastId,
            };

            products.push(newProduct);

            await this.#saveProducts(products);
        } catch (error) {
            console.log(error);
        }
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.#filePath)) {
                const products = JSON.parse(await fs.promises.readFile(this.#filePath, "utf-8"));
                return products;
            }

            return [];
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();

            const product = products.find((product) => product.id === id);

            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductById(id) {
        try {
            let products = await this.getProducts();

            products = products.filter((product) => product.id !== id);

            this.#saveProducts(products);
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(id, fieldToUpdate, newValue) {
        try {
            const products = await this.getProducts();

            const productIndex = products.findIndex((product) => product.id === id);

            if (productIndex < 0) {
                throw new Error(`Product with ID ${id} does not exist.`);
            }

            products[productIndex][fieldToUpdate] = newValue;

            await this.#saveProducts(products);
        } catch (error) {
            console.log(error);
        }
    }

    async #setLastId() {
        try {
            const products = await this.getProducts();

            if (products.length < 1) {
                this.#lastId = 0;
                return;
            }

            this.#lastId = products[products.length - 1].id;
        } catch (error) {
            console.log(error);
        }
    }

    async #saveProducts(products) {
        try {
            await fs.promises.writeFile(this.#filePath, JSON.stringify(products));
        } catch (error) {
            console.log(error);
        }
    }
}

const productsManager = new ProductsManager("./products.json");

console.log(await productsManager.getProducts());
