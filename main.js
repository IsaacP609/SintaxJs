// Programa para devolver contenido HTML, dependiendo de la petición del cliente

// Declaración de variables e importación de dependencias
var http = require('http'); // Objeto para poder crear el servidor de aplicaciones con Javascript
var urls = require('url');
var port = 3000;
var rutas = {}; // Para almacenar las rutas que se van a atender
rutas['/user'] = user;
rutas['/admin'] = admin;
rutas['/client'] = client;

// Funciones para responder a las peticiones del cliente
function user(res) {

    res.writeHead(200, { 'Content-type': 'text/html' });// Recibe la petición correctamente
    res.write('<h1>Hello User</h1>');
    res.end();
}

// Función para devolver texto/HTML
function admin(res) {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.write('<h1>Hello Administrator</h1>');
    res.end();
}

function client(res) {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.write('<h1>Hello Client</h1>');
    res.end();

}
function router(rutas, url, res) {
    // Validar
    if (typeof rutas[url] === 'function') {
        return rutas[url](res);
    } else {
        res.writeHead(404, { 'Content-type': 'text/html' });// Página que no existe, un recurso no encontrado
        res.write('<h1>Esta página no existe</h1>');
        res.end();
    }
}

// Iniciar servidor
http.createServer(function (req, res) {
    // Recoger el URL de la barra de direcciones
    url = urls.parse(req.url).pathname;
    router(rutas, url, res);
}).listen(port, 'localhost', function () {
    console.log('Servidor listo y corriendo en el puerto: ' + port);
});
