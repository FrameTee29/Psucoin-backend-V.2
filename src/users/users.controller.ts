import { Controller, Request, Post, UseGuards, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService,) { }

    @UseGuards(JwtAuthGuard)
    @Get('/')
    getAllUser() {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:sid')
    getUserBySid(@Param('sid') sid: string) {
        return this.usersService.getBySid(sid);
    }

    @Post('/signin')
    signIn(@Body() CreateUserDto:CreateUserDto) {
        return this.usersService.siginIn(CreateUserDto);
    }
}
