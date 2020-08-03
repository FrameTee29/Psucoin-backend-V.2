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

}

