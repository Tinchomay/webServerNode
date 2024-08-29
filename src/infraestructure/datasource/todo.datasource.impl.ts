import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from "../../domain";


export class TodoDataSourceImpl implements TodoDataSource {
    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDto!
        });
        return TodoEntity.fromObject(todo);
    }
    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(todo => TodoEntity.fromObject(todo))
    }
    async finById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({
            where: {id}
        });
        if (!todo) throw `Todo con id ${id} no existe`
        return TodoEntity.fromObject(todo);
    }
    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        await this.finById(updateTodoDto.id);
        const newTodo = await prisma.todo.update({
            where: {id: updateTodoDto.id},
            data: updateTodoDto!.values
        })
        return TodoEntity.fromObject(newTodo);
    }
    async deleteById(id: number): Promise<TodoEntity> {
        await this.finById(id);
        const todoDeleted = await prisma.todo.delete({
            where: {id}
        });
        return TodoEntity.fromObject(todoDeleted);
    }

}