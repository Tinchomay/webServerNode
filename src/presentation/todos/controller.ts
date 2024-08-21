import { Request, Response } from "express"
import { request } from "http"

let todos = [
    {id: 1, text: 'Buy milk', createdAt: new Date},
    {id: 2, text: 'Buy cereal', createdAt: new Date},
    {id: 3, text: 'Buy chocolate', createdAt: new Date},
]

export class TodoController {
    //Vamos a inyectar dependencias
    constructor(){};

    public getTodos = (req : Request, resp: Response) => {
        return resp.json(todos)
    }

    public getTodoById = (req : Request, resp: Response) => {
        //Agregando el simbolo mas "+" de donde obtenemos el id lo convertira en un numero, y si es un texto se convertira en null
        //Obtenemos el parametro id que definimos en la ruta
        const id = + req.params.id;

        //Si no es un nuermo retornamos un error de mala informacion
        if(isNaN(id)) return resp.status(400).json({error: `El id no es un numero` })

        const todo = todos.find(todo => todo.id === id);
        //Si existe todo retornamos sus valores como un json si no vamos a retornar un 404 para que caiga en una excepcion 
        (todo) 
            ? resp.json(todo)
            : resp.status(404).json('No encontrado');
    }

    public createTodo = (req : Request, resp : Response) => {
        //De todo lo que se envia solo vamos a extraer el text
        const { text } = req.body;
        //Si no existe el text arrojar un error
        if(!text) return resp.status(400).json({error: 'Falta el texto'})
        //Creamos un objeto como queramos y lo agregamos
        const newTodo = ({
            id: todos.length + 1,
            text,
            createdAt: new Date
        })
        todos.push(newTodo);
        //retornamos respuesta
        resp.send(newTodo);
    }

    public updateTodo = (req : Request, resp : Response) => {
        const id = + req.params.id;
        if(isNaN(id)) return resp.status(400).json({error: `El id no es un numero` })
        
        const todo = todos.find(todo => todo.id === id);
        if(!todo) return resp.status(404).json(`El id ${id} no fue encontrado`);
        
        const { text, createdAt } = req.body;
        if(!text) return resp.status(400).json({error: 'Falta el texto'});

        todo.text = text || todo.text;
        (createdAt)
            ? todo.createdAt = createdAt
            : null

        //!OJO, referencia

        return resp.json(todo)

    }
    
    public deleteTodo = (req : Request, resp : Response) => {
        const id = + req.params.id;
        if(isNaN(id)) return resp.status(400).json({error: `El id no es un numero` });

        const todo = todos.find(todo => todo.id === id);
        if(!todo) return resp.status(404).json(`El id ${id} no fue encontrado`);

        //indexof busca el indice en el array donde se encuentre todo, si no lo encuentra devuelve -1. El 1 de splice elimina un elemento a partir del indice dado, aqui solo elimina un elemento
        todos.splice(todos.indexOf(todo), 1);

        resp.json(todo);

    }
}