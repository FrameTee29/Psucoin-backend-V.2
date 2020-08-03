import { Injectable } from '@nestjs/common';
const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/8d1234baedad4a588a49a51ac993aaf8');

@Injectable()
export class FinanceService {

        /*---------------------------------- Method ในสร้าง Wallet----------------------------------------*/

        async createWallet() {
            var keys = web3.eth.accounts.create();
            return keys;
        }
    
        /*---------------------------------- Method ในสร้าง Wallet----------------------------------------*/
    
        //
        //
        //
        //
        //
        //

}
