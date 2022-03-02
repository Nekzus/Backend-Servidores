const express = require('express');
const Contenedor = require('./container.js');

const app = express();

app.get('/', (req, res) => {
    
    res.write("<h1 style='color: red'>Desafio: Servidor con Express</h1>");
    res.write("<h2>Rutas Servidor</h2>");
    res.write('<ul>');
    res.write('<li><h3><a href="/productos">Productos</a></h3></li>');
    res.write('<li><h3><a href="/productoRandom">Producto aleatorio</a></h3></li>');
    res.write('</ul>');
    res.end(); 
})

app.get('/productos', (req, res) => {
    const productos = new Contenedor('productos.json');
    productos.getAll()
        .then(productos => {
            res.send(productos);
        })
        .catch(error => {
            res.send(error);
        });
});

app.get('/productoRandom', (req, res) => {
    const productos = new Contenedor('productos.json');
    productos.getRandom()
        .then(producto => {
            res.send(producto);
        })
        .catch(error => {
            res.send(error);
        });
});

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(` Servidor escuchando en el puerto http://localhost:${PORT}`);
});

server.on('error', (error) => console.log(error));