import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('users')
@Controller('api/v1/user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    //creamos un usuario
    @Post()
    @ApiOperation({ summary: 'Created User'})
    create (@Body() userDTO:UserDTO){
        return this.userService.create(userDTO);
    }

    //traemos todos los usuarios
    @Get()
    @ApiOperation({ summary: 'Get Users'})
    findAll(){
        return this.userService.findAll();
    }

    //traer un solo usuario
    @Get(':id')
    @ApiOperation({ summary: 'Get One User'})
    findOne(@Param('id') id:string ){
        return this.userService.findOne(id)
    }

    //actualizar un usuario
    @Put(':id')
    @ApiOperation({ summary: 'Update User'})
    update(@Param('id') id:string, @Body() userDto:UserDTO){
        return this.userService.update(id,userDto);
    }

    //eliminar un usuario
    @Delete(':id')
    @ApiOperation({ summary: 'Delete User'})
    delete(@Param('id') id:string){
        return this.userService.delete(id);
    }
}
