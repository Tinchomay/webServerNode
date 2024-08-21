import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async () => {
    main();
})();

function main() {
    const server = new Server({
        port: envs.PORT, 
        publicPath: envs.PUBLIC_PATH,
        //Mandamos las rutas de nuestra clase las tenemos
        routes: AppRoutes.routes
    });
    server.start();
}