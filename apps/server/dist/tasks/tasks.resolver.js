"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_task_input_1 = require("./dto/create-task.input");
const task_model_1 = require("./models/task.model");
const tasks_service_1 = require("./tasks.service");
let TasksResolver = class TasksResolver {
    constructor(taskService) {
        this.taskService = taskService;
    }
    createTask(createTaskInput) {
        return this.taskService.create(createTaskInput);
    }
    async findAll() {
        return this.taskService.findAll();
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => task_model_1.Task),
    __param(0, (0, graphql_1.Args)('createTaskInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_input_1.CreateTaskInput]),
    __metadata("design:returntype", void 0)
], TasksResolver.prototype, "createTask", null);
__decorate([
    (0, graphql_1.Query)(() => [task_model_1.Task], { name: 'tasks' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksResolver.prototype, "findAll", null);
TasksResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [tasks_service_1.TaskService])
], TasksResolver);
exports.TasksResolver = TasksResolver;
//# sourceMappingURL=tasks.resolver.js.map