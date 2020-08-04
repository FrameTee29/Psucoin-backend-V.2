import { Injectable, Inject,  } from '@nestjs/common';
import loginPSUPassport from './psuapi';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entity/users.entity';
var sha256 = require('sha256');

@Injectable()
export class PsuapiService {
    constructor( @Inject('USERS_REPOSITORY') private user: typeof User,) {}

    // Login ด้วย PSUPASSPORT 
    async createaccoutwithPsupassport(username: string, password: string) {
        const Mypsupassport = await loginPSUPassport(username, password);
        const data = new CreateUserDto();
        if (Mypsupassport[0] === '') { // ถ้า login ด้วย psupassport ผิด หรือไม่มี
            return false;  // ไม่พบข้อมูล
        }
        else { // ถ้า login ด้วย Psupassport สำเร็จ
            data.username = Mypsupassport[0];
            data.password = await sha256(password);
            data.firstname = Mypsupassport[1];
            data.lastname = Mypsupassport[2];
            data.cid = Mypsupassport[3];

            
            
        }

    }

}
