import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateProfileDto } from './dto/createProfile.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

var sha256 = require('sha256');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService) { }


  //หลังจากใช้ API ในการ Login 
  async validateUser(username: string, password: string): Promise<any> {

  //check ว่ามี username ใน ระบบไหม
  //ถ้ามีแล้วให้ดึงข้อมูลขึ้นมา และ อัพเดทเหรียญ
  //ถ้าไม่มีให้ทำการสร้าง publickey & privatekey 


  }


  //  เพิ่มการทำงาน login จากที่สมัคร
  async login(user: any) {
    const info = user.toJSON();
    const payload = { username: info[0], password: info[1] } // เอาข้อมูลที่ได้มาเก็บไว้ใน payload
    return {
      access_token: this.jwtService.sign(payload), // แล้วทำการ return Access token 
    };
  }

}
