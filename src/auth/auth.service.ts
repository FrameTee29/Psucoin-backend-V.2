import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateProfileDto } from './dto/createProfile.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, infoforwallet } from 'src/users/dto/create-user.dto';

var sha256 = require('sha256');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService) { }

  async validateUser(username: string, password: string): Promise<any> {
  }


  //  เพิ่มการทำงาน login จากที่สมัคร
  async login(user: any) {
    const info = user.toJSON();
    const payload = { username: info[0], password: info[1] }
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
