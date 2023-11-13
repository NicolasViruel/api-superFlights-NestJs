import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor( private readonly userService:UserService,
        private readonly jwtService:JwtService) {}

    //metodo de validacion
    async validateUser(username: string, password: string) : Promise<any>{
        //consultamos si el usuario existe
        const user = await this.userService.findByUserName(username);
        //validamos si la contraseña son iguales
        const isValidPassword = await this.userService.checkPassword(password, user.password);
        //retornoamos el usuario
        if(user && isValidPassword) return user;
        return null;
    }

    //metodo de login
    async signIn(user: any){
        const payload = {
            username: user.name,
            sub: user._id
        };
        //retornamos el token
        return { access_token: this.jwtService.sign(payload)};
    }

    //metodo para Registrar
    async signUp(userDto:UserDTO){
        return this.userService.create(userDto);
    }
    
}
