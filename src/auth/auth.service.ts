import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateProfileDto } from './dto/createProfile.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, infoforwallet } from 'src/users/dto/create-user.dto';
import { ProfileService } from 'src/profile/profile.service';
var sha256 = require('sha256');

@Injectable()
export class AuthService {
  constructor(
    private ProfileService:ProfileService,
    private usersService: UsersService,
    private jwtService: JwtService) { }

  async validateUser(username: string, password: string): Promise<any> {

    const userinDB = await this.usersService.getUserBySid(username);
    if (userinDB) { //กรณีที่มีข้อมูลในระบบแล้ว
      const passbysid = await this.usersService.getPasswordBysid(username);
      const pass = Object.values(passbysid)
      if (sha256(password) == pass[0]) {
        return userinDB;
      }
      else {
        return null; // password Incorrect
      }
    }
    else { // ยังไม่มีรหัส
      const profile = new CreateUserDto();
      profile.username = username;
      profile.password = password;
      const user = await this.usersService.siginIn(profile);
      if (user == "Password Incorrect") {
        return null;
      }
      else {
        const wallet=await this.ProfileService.createwallet(username)
        console.log(wallet)
        return user;
      }

    }
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
