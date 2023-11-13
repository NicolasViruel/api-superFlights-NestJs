import { Controller, Post, Body, Get, Param, Put, Delete, Req, UseGuards } from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserDTO } from 'src/user/dto/user.dto';


@ApiTags('Authentication')
@Controller('/api/v1/auth')
export class AuthController {
    constructor( private readonly authService:AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signIn(@Req() req){
        return await this.authService.signIn(req.user);
    }

    @Post('signup')
    async signUp(@Body() userDTO:UserDTO){
        return await this.authService.signUp(userDTO);
    }

}
