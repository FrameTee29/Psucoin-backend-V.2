import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> { // เงื่อนไข
    const user = await this.usersService.findOne(username); // หา User ว่ามีไหม
    if (user && user.password === pass) { // ถ้ามี User และ Password ตรงกัน จะเป็น True
      const { password, ...result } = user;
      console.log(result);
      return result; // return ข้อมูล
      
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };  // นำ username + password มา gen เป็น token
    return {
      access_token: this.jwtService.sign(payload), // return ในรูปแบบ JSON  ใส่ Accesss token
    };
  }
}