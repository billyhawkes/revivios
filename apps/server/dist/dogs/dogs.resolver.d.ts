import { DogsService } from './dogs.service';
import { CreateDogInput } from './dto/create-dog.input';
import { UpdateDogInput } from './dto/update-dog.input';
export declare class DogsResolver {
    private readonly dogsService;
    constructor(dogsService: DogsService);
    createDog(createDogInput: CreateDogInput): string;
    findAll(): string;
    findOne(id: number): string;
    updateDog(updateDogInput: UpdateDogInput): string;
    removeDog(id: number): string;
}
