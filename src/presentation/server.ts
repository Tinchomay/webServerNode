import express from 'express';
import path from 'path';

interface Options {
    port: number;
    publicPath: string;
}
export class Server {
    private app = express();
    private readonly port : number;
    private readonly publicPath : string;
    constructor(options : Options){
        const {port, publicPath} = options;
        this.port = port;
        this.publicPath = publicPath
    }
    async start() {
        //middlewares

        //Public Folder, con esto hacemos publico los archivos de una carpeta
        //La primera vez que accedemos al / sirve la carpeta public, pero cuando accedemos a otra ruta pasa a la siguiente funcion
        this.app.use( express.static(this.publicPath))

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