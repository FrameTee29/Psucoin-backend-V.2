import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateProfileDto } from './dto/createProfile.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { usersProviders } from 'src/users/entity/users.providers';

var sha256 = require('sha256');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService) { }


  //หลังจากใช้ API ในการ Login 
  async validateUser(username: string, password: string): Promise<any> {

    //check ว่ามี username ใน ระบบไหม
    const userInDatabase = await this.usersService.getDetailUserByPK(username);
    //ถ้ามีแล้วให้ดึงข้อมูลขึ้นมา และ อัพเดทเหรียญ
    //ถ้าไม่มีให้ทำการสร้าง publickey & privatekey 

    // return userInDatabase;
    return userInDatabase
  }


  //  เพิ่มการทำงาน login จากที่สมัคร
  async login(user: any) {
    const payload = { username: user.username};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
