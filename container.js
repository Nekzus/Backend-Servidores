"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const fs_1 = __importDefault(require("fs"));
class Contenedor {
    productos;
    maxId;
    archivo;
    constructor(nombreArchivo) {
        this.productos = [];
        this.maxId = 0;
        this.archivo = nombreArchivo;
    }
    async save(producto) {
        if (await this.archivoExiste(this.archivo)) {
            await this.getAll();
            this.maxId++;
            producto.id = this.maxId;
            this.productos.push(producto);
            try {
                await fs_1.default.promises.writeFile(this.archivo, JSON.stringify(this.productos, null, 2));
                return this.maxId;
            }
            catch (error) {
                throw new Error(error);
            }
        }
        else {
            throw new Error('Archivo no existe');
        }
    }
    async getById(id) {
        await this.getAll();
        try {
            const producto = this.productos.find((producto) => producto.id === id);
            if (producto) {
                return producto;
            }
            else {
                throw new Error('Producto no encontrado');
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getAll() {
        try {
            const data = JSON.parse(await fs_1.default.promises.readFile(this.archivo, 'utf-8'));
            this.productos = data;
            this.productos.map((producto) => {
                if (producto.id && this.maxId < producto.id) {
                    this.maxId = producto.id;
                }
            });
            return this.productos;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async deleteById(id) {
        await this.getAll();
        try {
            const producto = this.productos.find((producto) => producto.id === id);
            if (producto) {
                this.productos = this.productos.filter((producto) => producto.id !== id);
                await fs_1.default.promises.writeFile(this.archivo, JSON.stringify(this.productos, null, 2));
            }
            else {
                throw new Error('Producto no encontrado');
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async deleteAll() {
        try {
            await fs_1.default.promises.writeFile(this.archivo, JSON.stringify([]));
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async archivoExiste(archivo) {
        try {
            await fs_1.default.promises.access(archivo, fs_1.default.constants.F_OK);
            return true;
        }
        catch (error) {
            return false;
        }
    }

    async getRandom() {
        await this.getAll();
        try {
            const producto = this.productos[Math.floor(Math.random() * this.productos.length)];
            if (producto) {
                return producto;
            }
            else {
                throw new Error('Producto no encontrado');
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
// const run = async () => {
//     const contenedor = new Contenedor('productos.json');
//     const producto = {
//         title: 'producto',
//         price: 15000,
//         thumbnail: 'https://picsum.photos/200',
//         id: 0,
//     };
//     //**DESCOMENTAR METODOS */
//     //** Metodo save */
//     const idProducto = await contenedor.save(producto);
//     console.log('*******************************');
//     console.log('Id producto guardado (save): ', idProducto);
//     console.log('*******************************');
//     //** Metodo getById */
//     const productoById = await contenedor.getById(5);
//     console.log('Producto por id (getById): ', productoById);
//     console.log('*******************************');
//     //** Metodo getAll */
//     const productos = await contenedor.getAll();
//     console.log('Productos en el archivo (getAll): ', productos);
//     console.log('*******************************');
//     //** Metodo delete */
//     await contenedor.deleteById(2);
//     //** Metodo deleteAll */
//     await contenedor.deleteAll();
// };
// run();
module.exports = Contenedor;







