//El router es una funcion que vamos a poder mandar a nuestro servidor como un middleware
import { Router } from "express";
import { TodoRoutes } from "./todos/routes";

export class AppRoutes {

    //El get aqui hace que la funcion tenga que retornar algo de la clase
    //Esta funcion retornara un tipo Router
    static get routes(): Router {
        const router = Router();
        
        //Utilizamos use para que sea un middleware y con esto basicamente vamos a agrupar rutas
        router.use('/api/todos', TodoRoutes.routes);

        return router;
    }
}