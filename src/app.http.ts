import http from 'http'
import fs from 'fs'

//El primer parametro es la request y el segundo la respuesta a esa request
const server = http.createServer((req, res) => {
    //Aparace la url requerida por el usario
    console.log(req.url)

    //El writeHead indica el tipo de respuesta que vamos a dar cuando visitemos una ruta, el primer parametro es el status de respues y el segundo el tipo de respuesta que tiene que ser un objeto con Content-Type
    // res.writeHead(200, {'Content-Type': 'text/html'})
    // res.write(`<h1>URL ${req.url}</h1>`)
    // res.end();

    // const data = {name: 'John Doe', age: 30, city: 'New York'};
    // //Aqui vamos a devolver JSON
    // res.writeHead(200, {'Content-Type': 'application/json'});
    // //Podemos devolver el json directamente en el end, y para que sea un json tenemos que aplicar el metodo stringify
    // res.end(JSON.stringify(data));

    //Respuesta leyendo de un archivo

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