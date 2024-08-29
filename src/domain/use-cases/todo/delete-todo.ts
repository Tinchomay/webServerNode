import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repository/todo.repository";

//Sera la regla para nuestro caso de uso
export interface DeleteTodoUseCase {
    //execute es el metodo que tendra nuestro caso de uso
    execute(id : number) : Promise<TodoEntity>;
}

export class DeleteTodo implements DeleteTodoUseCase {
    //A los casos de uso les vamos a inyectar el repositorio
    constructor(
        private readonly repository : TodoRepository
    ){}

    //Este metodo llama al repo con el metodo que necesitamos
    execute(id : number): Promise<TodoEntity> {
        return this.repository.deleteById(id);
    }
}