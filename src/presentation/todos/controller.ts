import { Request, Response } from "express"
import { request } from "http"
import { prisma } from "../../data/postgres"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodoController {
    //Vamos a inyectar dependencias
    constructor(){};

    public getTodos = async (req : Request, resp: Response) => {
        const todos = await prisma.todo.findMany();
        return resp.json(todos);
    }

    public getTodoById = async (req : Request, resp: Response) => {
        //Agregando el simbolo mas "+" de donde obtenemos el id lo convertira en un numero, y si es un texto se convertira en null
        //Obtenemos el parametro id que definimos en la ruta
        const id = + req.params.id;

        //Si no es un nuermo retornamos un error de mala informacion
        if(isNaN(id)) return resp.status(400).json({error: `El id no es un numero` })

        const todo = await prisma.todo.findFirst({
            where: {
                id
            }
        });
        (todo) 
            ? resp.json(todo)
            : resp.status(404).json('No encontrado');
    }

    public createTodo = async (req : Request, resp : Response) => {
        //Extraemos el string o la instancia
        const [error, createTodoDto] = CreateTodoDto.create(req.body)
        //Si hay error retornamos un 404 con el error
        if(error) return resp.status(404).json({error})
        //Si llegamos a este punto no hay error y utilizamos el signo ! para decirle a TS que si esta presente el valor
        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        resp.send(todo);
    }

    public updateTodo = async (req : Request, resp : Response) => {
        const id = + req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.update({
            ...req.body,
            id
        })
        if(error) return resp.status(404).json({error})
        const todo = await prisma.todo.findUnique({
            where: {id}
        })
        if(!todo) return resp.status(404).json(`El id ${id} no fue encontrado`);
        const newTodo = await prisma.todo.update({
            where: {
                id
            },
            //Aqui utilizamos el metodo que asigna los valores al objeto de retorno porque ya hay una instancia
            data: updateTodoDto!.values
        })
        return resp.json(newTodo)
    }
    
    public deleteTodo = async (req : Request, resp : Response) => {
        const id = + req.params.id;
        if(isNaN(id)) return resp.status(400).json({error: `El id no es un numero` });
        const todo = await prisma.todo.findUnique({
            where: {
                id
            }
        })
        if(!todo) return resp.status(404).json(`El id ${id} no fue encontrado`);
        const todoDeleted = await prisma.todo.delete({
            where: {
                id
            }
        })
        resp.json({todo, todoDeleted});

    }
}