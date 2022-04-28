import { CreateDogInput } from './dto/create-dog.input';
import { UpdateDogInput } from './dto/update-dog.input';
export declare class DogsService {
    create(createDogInput: CreateDogInput): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDogInput: UpdateDogInput): string;
    remove(id: number): string;
}
