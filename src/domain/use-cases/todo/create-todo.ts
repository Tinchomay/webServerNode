import { CreateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repository/todo.repository";

//Sera la regla para nuestro caso de uso
export interface CreateTodoUseCase {
    //execute es el metodo que tendra nuestro caso de uso
    execute( dto : CreateTodoDto) : Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUseCase {

    //A los casos de uso les vamos a inyectar el repositorio
    constructor(
        private readonly repository : TodoRepository
    ){}

    //Este metodo llama al repo con el metodo que necesitamos
    execute(dto: CreateTodoDto): Promise<TodoEntity> {
        return this.repository.create(dto);
    }

}