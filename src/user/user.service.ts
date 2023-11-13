import { Injectable, HttpStatus } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { IUser } from 'src/common/interface/user.interface';
import { USER } from 'src/common/models/model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor (@InjectModel(USER.name) private readonly model: Model<IUser>){
    }

    //metodo para checkar password
    async checkPassword(password: string, passwordDB: string) : Promise<boolean>{
        return await bcrypt.compare(password, passwordDB);
    }

    //metodo para encontrar un usuario por username
    async findByUserName(username:string){
        return await this.model.findOne({ username });
    }

    //metodo para hashear la password con bcrypt
    async hashPassword (password:string) : Promise<String>{
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    //metodo para crear
    async create(userDTO:UserDTO) : Promise<IUser>{
        const hash = await this.hashPassword(userDTO.password);
        const newUser = new this.model({ ...userDTO, password:hash});
        return await newUser.save()
    }

    //metodo para traer todos
    async findAll() : Promise<IUser[]>{
        return await this.model.find();
    }
    //metodo para traer un solo usuario
    async findOne(id:string) : Promise<IUser>{
        return await this.model.findById(id);
    }

    //metodo para actualizar un usuario
    async update(id : string, userDto: UserDTO) : Promise<IUser>{
        const hash = await this.hashPassword(userDto.password);
        const user = { ...userDto, password:hash};
        return await this.model.findByIdAndUpdate(id, user , { new: true} );
    }

    //metodo para eliminar un usuario
    async delete(id:string){
        await this.model.findByIdAndDelete(id);
        return {status: HttpStatus.OK , msg:'Delete'};
    }
}
