import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { User } from './entity/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { FinanceService } from 'src/finance/finance.service';
var sha256 = require('sha256');
const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/8d1234baedad4a588a49a51ac993aaf8');
// import { createWriteStream } from 'fs';
// import * as soap from 'soap';
// import * as bcrypt from 'bcrypt';
// import Axios from 'axios';

@Injectable()
export class UsersService {
    constructor(@Inject('USERS_REPOSITORY') private user: typeof User,
        private financeService: FinanceService) { }

    /*-----------------------------------Method หาข้อมูล User ในระบบ-------------------------------------*/
    async getUserByPK(username: string) {

        const account = await this.user.findByPk(username);
        if (account) { // ถ้ามีข้อมูล user นี้อยู่ในระบบให้รีเทิร์น 1 แสดงว่ามีแล้ว
            return true;
        }
        return false; // ถ้าไม่มีข้อมูลในระบบให้รีเทิร์น 0 

    }
    /*--------------------------------End Method หาข้อมูล User ในระบบ------------------------------------*/

    //
    //
    //
    //
    //
    //

    /*-------------------------------------- Method ในการสมัคร-------------------------------------------*/
    async SignupUser(CreateUserDto: CreateUserDto) {

        // Check ก่อนว่ามี Username นี้ในระบบหรือยัง
        const userInDatabase = await this.getUserByPK(CreateUserDto.username);

        if (userInDatabase) { // ถ้ามีผู้ใช้งานในระบบแล้วจะ รีเทิร์นว่ามีผู้ใช้งานในระบบแล้ว
            return "Already have this account";
        }
        else { // ถ้าไม่มีทีจะทำการสมัครและทำการสร้าง wallet
            const userinformation = new User();
            userinformation.username = CreateUserDto.username;
            userinformation.password = await sha256(CreateUserDto.password);
            userinformation.firstname = CreateUserDto.firstname;
            userinformation.lastname = CreateUserDto.lastname;
            userinformation.cid = CreateUserDto.cid;
            const keys = await this.financeService.createWallet();
            console.log(JSON.stringify(keys));
            userinformation.publickey = keys.address;
            userinformation.privatekey = keys.privateKey.toUpperCase().substring(2);
            userinformation.coin = 0;
            return await this.user.create(userinformation.toJSON());;
        }
    }
    /*--------------------------------End Method ในการสมัคร-------------------------------------------*/

    //
    //
    //
    //
    //
    //




}

