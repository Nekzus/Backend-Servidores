const http = require('http');

const server = http.createServer((req, res) => {
    res.end(JSON.stringify(new Date().toLocaleTimeString()));
});

const PORT = 8081;

server.listen(PORT, () => {
    console.log(` Servidor escuchando en el puerto http://localhost:${PORT}`);
});