import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repository/todo.repository";

//Sera la regla para nuestro caso de uso
export interface GetAllTodoUseCase {
    //execute es el metodo que tendra nuestro caso de uso
    execute() : Promise<TodoEntity[]>;
}

export class GetAllTodo implements GetAllTodoUseCase {
    //A los casos de uso les vamos a inyectar el repositorio
    constructor(
        private readonly repository : TodoRepository
    ){}

    //Este metodo llama al repo con el metodo que necesitamos
    execute(): Promise<TodoEntity[]> {
        return this.repository.getAll();
    }
}