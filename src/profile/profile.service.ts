import { Injectable, Inject } from '@nestjs/common';
import { Profile } from './entity/profile.entity';
import { BaseCreateWallet, ProfileWallet } from './dto/create-profile.dto';
import { UsersService } from 'src/users/users.service';
import { ProfileModule } from './profile.module';

const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/8d1234baedad4a588a49a51ac993aaf8')

@Injectable()
export class ProfileService {

    constructor(@Inject('PROFILES_REPOSITORY') private profile: typeof Profile,private usersService: UsersService,) { }


    async createwallet(username: string) {
        var account = web3.eth.accounts.create();
        const Mywallet = new ProfileWallet();
        Mywallet.sid = username;
        Mywallet.publickey = account.address;
        Mywallet.coin ="0";
        Mywallet.privatekey = account.privateKey.toUpperCase().substring(2);
        return this.profile.create(Mywallet);
    }
}
