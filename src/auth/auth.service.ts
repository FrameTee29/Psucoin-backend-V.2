import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateProfileDto } from './dto/createProfile.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { usersProviders } from 'src/users/entity/users.providers';
import { FinanceService } from 'src/finance/finance.service';
import { PsuapiService } from './psuapi/psuapi.service';

var sha256 = require('sha256');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private financeSerivce:FinanceService,
    private psuapiService : PsuapiService,
    private jwtService: JwtService) { }


  //หลังจากใช้ API ในการ Login 
  async validateUser(username: string , password : string): Promise<any> {


    //check ว่ามี username ใน ระบบไหม
    const userInDatabase = await this.usersService.getUserByPK(username);

    if (userInDatabase) { /* ถ้ามีข้อมูล */

      //ตรงนี้ต้องทำ อัพเดทเหรียญด้วย
      await this.financeSerivce.getUpdateBalance(username);

      //return ข้อมูลผู้ใช้งานเพื่อไป genarate token
      return await this.usersService.getDetailUserByPK(username); 

    }
    else {//ถ้าไม่มีให้ทำการสร้าง publickey & privatekey 
     await this.psuapiService.createaccoutwithPsupassport(username,password);
    }
  
  }


  //  เพิ่มการทำงาน login จากที่สมัคร
  async login(user: any) { // user จะมีค่าเท่ากับค่าที่รีเทิร์นมาจากด้านบน userInDatabase
      const payload = { username: user.username };
      return {
        access_token: this.jwtService.sign(payload),
      };
  }


}
