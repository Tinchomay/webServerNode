import express, { Router } from 'express';
import path from 'path';

interface Options {
    port: number;
    publicPath: string;
    //La agregamos a la interfaz
    routes : Router;
}
export class Server {
    private app = express();
    private readonly port : number;
    private readonly publicPath : string;
    //Creamos la propiedad
    private readonly routes : Router;

    constructor(options : Options){
        const {port, publicPath, routes} = options;
        this.port = port;
        this.publicPath = publicPath;
        //Insertamos valores
        this.routes = routes;
    }
    async start() {
        //middlewares
        this.app.use( express.json() );

        this.app.use(express.urlencoded({ extended: true }));

        //Utilizamos las rutas
        this.app.use(this.routes)

        //Public Folder, con esto hacemos publico los archivos de una carpeta
        //La primera vez que accedemos al / sirve la carpeta public, pero cuando accedemos a otra ruta pasa a la siguiente funcion
        this.app.use( express.static(this.publicPath))

        //Ayuda a los SPA
        //Aqui indicamos con el * que todas las rutas que sean get van a ser redirigidas al index html
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
            return
        });
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }
}