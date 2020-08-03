import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { User } from './entity/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { createWriteStream } from 'fs';
import * as soap from 'soap';
import * as bcrypt from 'bcrypt';
import Axios from 'axios';
var sha256 = require('sha256')

@Injectable()
export class UsersService {
    constructor(@Inject('USERS_REPOSITORY') private user: typeof User) { }


    async SignupUser(CreateUserDto:CreateUserDto){

        const userinformation = new User();
        userinformation.username = CreateUserDto.username;
        userinformation.password = CreateUserDto.password;
        userinformation.firstname = CreateUserDto.firstname;
        userinformation.lastname = CreateUserDto.lastname;
        userinformation.cid = CreateUserDto.cid;
        userinformation.publickey = CreateUserDto.publickey;
        userinformation.privatekey = CreateUserDto.privatekey;
        userinformation.coin = CreateUserDto.coin;

        return userinformation;
    }


}

