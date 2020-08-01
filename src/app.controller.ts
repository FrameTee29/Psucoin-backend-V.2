import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  // API นี้จะทำการรับ parameter เป็น Username และ password 
  @UseGuards(LocalAuthGuard) 
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user); // เรียกใช้งาน authservice ฟังก์ฺชั่น login 
  }


  // API นี้จะ get ค่าของ user แสดงว่า profile ของผู้ใช้งาน 
  @UseGuards(JwtAuthGuard)
  @Get('profile') 
  getProfile(@Request() req) {
    return req.user; // return เป็นข้อมูล profile ของ user คนนั้น
  }
}