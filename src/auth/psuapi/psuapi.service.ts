import { Injectable, Inject,  } from '@nestjs/common';
import loginPSUPassport from './psuapi';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entity/users.entity';
import { FinanceService } from 'src/finance/finance.service';
import { UsersService } from 'src/users/users.service';
var sha256 = require('sha256');

@Injectable()
export class PsuapiService {
    constructor( @Inject('USERS_REPOSITORY') private user: typeof User,private financeService : FinanceService,private userService : UsersService) {}

    // Login ด้วย PSUPASSPORT 
    async createaccoutwithPsupassport(username: string, password: string) {
        const Mypsupassport = await loginPSUPassport(username, password);
        const myaccount = new User();
        if (Mypsupassport[0] === '') { // ถ้า login ด้วย psupassport ผิด หรือไม่มี
            return false;  // ไม่พบข้อมูล
        }
        else { // ถ้า login ด้วย Psupassport สำเร็จ
            myaccount.username = Mypsupassport[0];
            myaccount.password = await sha256(password);
            myaccount.firstname = Mypsupassport[1];
            myaccount.lastname = Mypsupassport[2];
            myaccount.cid = Mypsupassport[3];
            myaccount.email= "";
            const keys = await this.financeService.createWallet();
            myaccount.publickey = keys.address;
            myaccount.privatekey = keys.privateKey.toUpperCase().substring(2);
            myaccount.coin = 0 ;
            await this.user.create(myaccount.toJSON());
            
        }

    }

}
