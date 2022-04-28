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
exports.DogsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const dogs_service_1 = require("./dogs.service");
const dog_entity_1 = require("./entities/dog.entity");
const create_dog_input_1 = require("./dto/create-dog.input");
const update_dog_input_1 = require("./dto/update-dog.input");
let DogsResolver = class DogsResolver {
    constructor(dogsService) {
        this.dogsService = dogsService;
    }
    createDog(createDogInput) {
        return this.dogsService.create(createDogInput);
    }
    findAll() {
        return this.dogsService.findAll();
    }
    findOne(id) {
        return this.dogsService.findOne(id);
    }
    updateDog(updateDogInput) {
        return this.dogsService.update(updateDogInput.id, updateDogInput);
    }
    removeDog(id) {
        return this.dogsService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => dog_entity_1.Dog),
    __param(0, (0, graphql_1.Args)('createDogInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dog_input_1.CreateDogInput]),
    __metadata("design:returntype", void 0)
], DogsResolver.prototype, "createDog", null);
__decorate([
    (0, graphql_1.Query)(() => [dog_entity_1.Dog], { name: 'dogs' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DogsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => dog_entity_1.Dog, { name: 'dog' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DogsResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => dog_entity_1.Dog),
    __param(0, (0, graphql_1.Args)('updateDogInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_dog_input_1.UpdateDogInput]),
    __metadata("design:returntype", void 0)
], DogsResolver.prototype, "updateDog", null);
__decorate([
    (0, graphql_1.Mutation)(() => dog_entity_1.Dog),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DogsResolver.prototype, "removeDog", null);
DogsResolver = __decorate([
    (0, graphql_1.Resolver)(() => dog_entity_1.Dog),
    __metadata("design:paramtypes", [dogs_service_1.DogsService])
], DogsResolver);
exports.DogsResolver = DogsResolver;
//# sourceMappingURL=dogs.resolver.js.map