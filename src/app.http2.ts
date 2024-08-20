import http2 from 'http2'
import fs from 'fs'

//Con http2 tenemos que utilizar un createSecureServer
const server = http2.createSecureServer({
    //aqui agregamos las rutas de los archivos que creamos
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
} ,(req, res) => {

    console.log(req.url)


    switch(req.url) {
        case '/':
            const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(htmlFile);
            break;
        case '/css/styles.css':
            const cssFile = fs.readFileSync('./public/css/styles.css', 'utf-8');
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.end(cssFile);
            break;
        case '/js/app.js' :
            const jsFile = fs.readFileSync('./public/js/app.js', 'utf-8');
            res.writeHead(200, {'Content-Type': 'application/javascript'});
            res.end(jsFile);
            break;
        default : 
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('Pagina no encontrada');
    }
})

//Iniciamos el servidor en el puerto 8080
server.listen(8080, () => {
    //Mostramos en consola que estamos iniciando el servidor
    console.log('Server running on port 8080')
});