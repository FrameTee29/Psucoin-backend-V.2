import { Injectable, Inject } from '@nestjs/common';
const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/8d1234baedad4a588a49a51ac993aaf8');
import * as token from './Token/detail-token.dto';
import { async } from 'rxjs/internal/scheduler/async';
import { User } from 'src/users/entity/users.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';



@Injectable()
export class FinanceService {

    constructor(@Inject('USERS_REPOSITORY') private user: typeof User,) { }


    /*---------------------------------- Method ในสร้าง Wallet----------------------------------------*/

    async createWallet() {
        var keys = web3.eth.accounts.create();
        return keys; // address & privatekey
    }

    /*----------------------------------End Method ในสร้าง Wallet----------------------------------------*/





    /*---------------------------------- Method Get ค่า publickey----------------------------------------*/

    async getPublicKey(username: string) {
        const publickey = await this.user.findOne({
            plain: true,
            attributes: ['publickey'],
            where: {
                username: username
            }
        })
        return publickey.publickey;
    }

    /*----------------------------------End Method Get ค่า publickey----------------------------------------*/





    /*---------------------------------- Method Get ค่า privatekey----------------------------------------*/

    async getPrivateKey(username: string) {
        const privatekey = await this.user.findOne({
            plain: true,
            attributes: ['privatekey'],
            where: {
                username: username
            }
        })
        return privatekey.privatekey;
    }

    /*----------------------------------End Method Get ค่า privatekey----------------------------------------*/






    /*---------------------------------- Method ในดึงค่าจำนวนเหรียญที่มี----------------------------------------*/

    async getBalance(username:string) {
        return new Promise(async (resolve , reject)=>{
            const publickey = await this.getPublicKey(username);
            const contract = new web3.eth.Contract(token.contractAbi,token.contractAddress);
            await contract.methods.balanceOf(publickey).call().then(res=>{
                resolve(res/1000000000000000000);
            })
        })
    }

    /*----------------------------------End Method ในดึงค่าจำนวนเหรียญที่มี----------------------------------------*/





    /*---------------------------------- Method อัพเดทเหรียญ----------------------------------------*/

    async getUpdateBalance(username:string) {
        const updateData = new CreateUserDto();
        const data = await this.user.findOne({where:{username:username}})
        updateData.username = data.username;
        updateData.firstname = data.firstname;
        updateData.lastname = data.lastname;
        updateData.cid = data.cid;
        updateData.email = data.email;
        updateData.coin = await this.getBalance(username);
        await data.update(updateData)
        
    }

    /*----------------------------------End Method อัพเดทเหรียญ----------------------------------------*/



}
