import { Router } from "express";
import { TodoController } from "./controller";
import { TodoRepositoryImpl } from "../../infraestructure/repositories/todo.repository.impl";
import { TodoDataSourceImpl } from "../../infraestructure/datasource/todo.datasource.impl";

//Esta sera la clase que controle todas las rutas de todo, basicamente suma las rutas a donde se utilizan
export class TodoRoutes {
    static get routes(): Router {
        const router = Router();

        const dataSource = new TodoRepositoryImpl( new TodoDataSourceImpl());
        const todoController = new TodoController(dataSource);

        //Podemos mandar el req y la resp al controlador en el segundo parametro
        // router.get('/api/todos', (req, resp) => todoController.getTodos(req, resp));
        //O utilizar directamente la forma corta que manda implicitamente los ambos argumentos
        //Aqui cuando accedamos a la ruta /api/todos se va a ejecutar esto
        router.get('/', todoController.getTodos);

        //Esta es una sintaxis especial de express donde le decimos que vamos a recibir un argumento al que llamaremos id
        router.get('/:id', todoController.getTodoById);

        router.post('/', todoController.createTodo);

        router.put('/:id', todoController.updateTodo);

        router.delete('/:id', todoController.deleteTodo);

        return router;
    }
}