import { Request, Response } from "express"
import { prisma } from "../../data/postgres"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";


export class TodoController {
    constructor(
        private readonly todoRepository : TodoRepository
    ){};

    public getTodos = async (req : Request, resp: Response) => {
        const todos = await this.todoRepository.getAll();
        return resp.json(todos);
    }

    public getTodoById = async (req : Request, resp: Response) => {
        //Agregando el simbolo mas "+" de donde obtenemos el id lo convertira en un numero, y si es un texto se convertira en null
        //Obtenemos el parametro id que definimos en la ruta
        const id = + req.params.id;

        //Si no es un nuermo retornamos un error de mala informacion
        if(isNaN(id)) return resp.status(400).json({error: `El id no es un numero` })
        try {
            const todo = await this.todoRepository.finById(id)
            return resp.json(todo);
        } catch (error) {
            return resp.status(404).json(error)
        }
    }

    public createTodo = async (req : Request, resp : Response) => {
        //Extraemos el string o la instancia
        const [error, createTodoDto] = CreateTodoDto.create(req.body)
        //Si hay error retornamos un 404 con el error
        if(error) return resp.status(404).json({error})

        const todo = await this.todoRepository.create(createTodoDto!)

        resp.send(todo);
    }

    public updateTodo = async (req : Request, resp : Response) => {
        const id = + req.params.id;
        //Aqui reemplazamos si hay algun id en el body por el que se esta mandando como parametro a la url
        const [error, updateTodoDto] = UpdateTodoDto.update({
            ...req.body,
            id
        })
        if(error) return resp.status(404).json({error})
        const todo = await this.todoRepository.updateById(updateTodoDto!)
        return resp.json(todo)
    }
    
    public deleteTodo = async (req : Request, resp : Response) => {
        const id = + req.params.id;
        if(isNaN(id)) return resp.status(400).json({error: `El id no es un numero` });
        try {
            const todo = await this.todoRepository.deleteById(id)
            resp.json(todo);
        } catch (error) {
            return resp.status(400).json(error)
        }

    }
}