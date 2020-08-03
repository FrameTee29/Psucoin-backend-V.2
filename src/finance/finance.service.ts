import { Injectable, Inject } from '@nestjs/common';
const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/8d1234baedad4a588a49a51ac993aaf8');
import * as token from './Token/detail-token.dto';
import { async } from 'rxjs/internal/scheduler/async';
import { User } from 'src/users/entity/users.entity';



@Injectable()
export class FinanceService {

    constructor(@Inject('USERS_REPOSITORY') private user: typeof User,){}
    

    /*---------------------------------- Method ในสร้าง Wallet----------------------------------------*/

    async createWallet() {
        var keys = web3.eth.accounts.create();
        return keys; // address & privatekey
    }

    /*----------------------------------End Method ในสร้าง Wallet----------------------------------------*/








    /*---------------------------------- Method ในดึงค่าจำนวนเหรียญที่มี----------------------------------------*/

    async getPublicKey(username:string) {
        const publicKey = await this.user.findOne({
            plain: true,
            attributes: ['publickey'],
            where: {
                username: username
            }
        })
        return publicKey.publickey; 
    }

    /*----------------------------------End Method ในดึงค่าจำนวนเหรียญที่มี----------------------------------------*/







    /*---------------------------------- Method ในดึงค่าจำนวนเหรียญที่มี----------------------------------------*/

    async getPrivateKey() {
        


    }

    /*----------------------------------End Method ในดึงค่าจำนวนเหรียญที่มี----------------------------------------*/









    /*---------------------------------- Method ในดึงค่าจำนวนเหรียญที่มี----------------------------------------*/

    async getBalance() {


    }

    /*----------------------------------End Method ในดึงค่าจำนวนเหรียญที่มี----------------------------------------*/



}
