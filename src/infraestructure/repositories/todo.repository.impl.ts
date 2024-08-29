import { CreateTodoDto, TodoDataSource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";

export class TodoRepositoryImpl implements TodoRepository {

    constructor(
        //Este datasource tiene que venir del domain donde especificamos los metodos que son necesarios
        private readonly datasource : TodoDataSource
    ){}

    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.datasource.create(createTodoDto)
    }
    getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll()
    }
    finById(id: number): Promise<TodoEntity> {
        return this.datasource.finById(id)
    }
    updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.datasource.updateById(updateTodoDto)
    }
    deleteById(id: number): Promise<TodoEntity> {
        return this.datasource.deleteById(id)
    }

}