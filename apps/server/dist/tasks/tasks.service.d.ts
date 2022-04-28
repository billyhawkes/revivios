import { CreateTaskInput } from './dto/create-task.input';
export declare class TaskService {
    create(createTaskInput: CreateTaskInput): string;
    findAll(): any[];
}
