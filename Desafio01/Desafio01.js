class Producto {
    static contadorProductos = 0;
    static precioBaseDeGanancia = 0.2;

    constructor({ nombre, ubicacionEnvio, precio = 50, stock = 50, fecha = Date.now(), compradores = [] }) {
        this.nombre = nombre;
        this.ubicacionEnvio = ubicacionEnvio;
        this.precio = precio * (1 + Producto.precioBaseDeGanancia);
        this.stock = stock;
        this.fecha = fecha;
        this.compradores = compradores;
        this.id = ++Producto.contadorProductos;
    }
}

class EcommerceManager {
    constructor() {
        this.productos = [];
    }

    getProductos = () => {
        return this.productos;
    };

    agregarProducto = (nombre, ubicacionEnvio, precio = 50, stock = 50, fecha = Date.now()) => {
        const producto = new Producto({ nombre, ubicacionEnvio, precio, stock, fecha });
        this.productos.push(producto);
        return producto.id;
    };

    agregarCliente = (nombreProducto, idCliente) => {
        // Verifica la existencia del producto
        const producto = this.productos.find((producto) => producto.nombre === nombreProducto);
        if (!producto) {
            console.log("El producto no existe!");
            return;
        }

        // Verifica que el cliente no haya comprado ya el producto
        const clienteYaComproProducto = producto.compradores.includes(idCliente);
        if (clienteYaComproProducto) {
            console.log("El cliente ya ha comprado este producto!");
            return;
        }

        producto.compradores.push(idCliente);
    };

    modificarEnvioProducto = (nombreProducto, ubicacionEnvio, fecha = Date.now()) => {
        // Encuentra el producto por su nombre
        const producto = this.productos.find((producto) => producto.nombre === nombreProducto);
        if (!producto) {
            console.log("El producto no existe!");
            return;
        }

        // Modifica el envío del producto existente en lugar de crear uno nuevo
        producto.ubicacionEnvio = ubicacionEnvio;
        producto.fecha = fecha;

        return producto.id;
    };
}

// Instancio el EcommerceManager
const ecommerceManager = new EcommerceManager();

const producto1 = ecommerceManager.agregarProducto("Smartphone", "Estados Unidos", 500, 150, "2023-12-10");
const producto2 = ecommerceManager.agregarProducto("Notebook", "China", 800, 100, "2023-11-19");
const producto3 = ecommerceManager.agregarProducto("Smartwatch", "Alemania", 300, 200, "2023-12-22");

ecommerceManager.agregarCliente("Smartphone", "Cliente1");
ecommerceManager.agregarCliente("Smartphone", "Cliente2");
ecommerceManager.agregarCliente("Notebook", "Cliente3");
ecommerceManager.agregarCliente("Notebook", "Cliente4");
ecommerceManager.agregarCliente("Smartwatch", "Cliente5");

const producto4 = ecommerceManager.modificarEnvioProducto("Smartphone", "Argentina", "2023-12-15");
ecommerceManager.agregarCliente("Smartphone", "Cliente6");

console.log(ecommerceManager.getProductos());

