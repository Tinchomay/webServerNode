import { Request, Response } from "express"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { CreateTodo, DeleteTodo, GetAllTodo, GetByIdTodo, TodoRepository, UpdateTodo } from "../../domain";


export class TodoController {
    constructor(
        private readonly todoRepository : TodoRepository
    ){};

    public getTodos = (req : Request, resp: Response) => {
        new GetAllTodo(this.todoRepository).execute()
            //Con el then obtenemos los todos es como si hicieramos un await en a la constante todos
            .then((todos) => {
                resp.json(todos)
                //Aqui atrapamos un error si no funciona el then 
            }).catch((err) => {
                resp.status(400).json({err})
            });
    }

    public getTodoById = (req : Request, resp: Response) => {
        //Agregando el simbolo mas "+" de donde obtenemos el id lo convertira en un numero, y si es un texto se convertira en null
        //Obtenemos el parametro id que definimos en la ruta
        const id = + req.params.id;

        new GetByIdTodo(this.todoRepository).execute(id)
            .then(todo => resp.json(todo))
            .catch(err => resp.status(400).json({err}));
    }

    public createTodo = (req : Request, resp : Response) => {
        //Extraemos el string o la instancia
        const [error, createTodoDto] = CreateTodoDto.create(req.body)
        //Si hay error retornamos un 404 con el error
        if(error) return resp.status(404).json({error})

        new CreateTodo(this.todoRepository).execute(createTodoDto!)
            .then(todo => resp.json(todo))
            .catch(err => resp.status(400).json({err}));

    }

    public updateTodo = (req : Request, resp : Response) => {
        const id = + req.params.id;
        //Aqui reemplazamos si hay algun id en el body por el que se esta mandando como parametro a la url
        const [error, updateTodoDto] = UpdateTodoDto.update({...req.body, id})
        if(error) return resp.status(404).json({error})
        new UpdateTodo(this.todoRepository).execute(updateTodoDto!)
            .then(todo => resp.json(todo))
            .catch(err => resp.status(400).json({err}));
    }
    
    public deleteTodo = (req : Request, resp : Response) => {
        const id = + req.params.id;
        if(isNaN(id)) return resp.status(400).json({error: `El id no es un numero` });
        new DeleteTodo(this.todoRepository).execute(id)
            .then(todo => resp.json(todo))
            .catch(err => resp.status(400).json({err}));
    }
}