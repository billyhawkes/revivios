import { CreateTaskInput } from './dto/create-task.input';
import { TaskService } from './tasks.service';
export declare class TasksResolver {
    private readonly taskService;
    constructor(taskService: TaskService);
    createTask(createTaskInput: CreateTaskInput): string;
    findAll(): Promise<any[]>;
}
