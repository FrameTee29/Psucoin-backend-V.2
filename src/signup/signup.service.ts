import { Injectable, Inject } from '@nestjs/common';
import { User } from 'src/users/entity/users.entity';
import { Profile } from 'src/profile/entity/profile.entity';
import { DetailSignup } from './dto/create-signup.dto';
import { Json } from 'sequelize/types/lib/utils';
import { ProfileWallet } from 'src/profile/dto/create-profile.dto';
import { ProfileService } from 'src/profile/profile.service';
import { UsersService } from 'src/users/users.service';
const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/8d1234baedad4a588a49a51ac993aaf8')
var sha256 = require('sha256')

@Injectable()
export class SignupService {

    constructor(@Inject('USERS_REPOSITORY') private user: typeof User,
        @Inject('PROFILES_REPOSITORY') private readonly profile: typeof Profile,
        private ProfileService: ProfileService,
        private usersService: UsersService,) { }




    async Register(DetailSignup: DetailSignup) {
//สมัคร
        const userinDB = await this.usersService.getUserBySid(DetailSignup.username);
        if (userinDB) {

            return "มีผู้ใช่งานชื่อนี้แล้ว กรุณาเปลี่ยนชื่อ"
        }
        else {
            const signup = new User();
            
            signup.sid = DetailSignup.username;
            signup.password = await sha256(DetailSignup.password);
            signup.firstname = DetailSignup.firstname;
            signup.lastname = DetailSignup.lastname;
            signup.cid = DetailSignup.cid;
            const username = DetailSignup.username;
            await this.user.create(signup.toJSON());
            await this.ProfileService.createwallet(username);
            return signup.toJSON();
        }
    }
}
