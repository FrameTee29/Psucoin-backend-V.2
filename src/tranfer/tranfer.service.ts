import { Injectable, Inject } from '@nestjs/common';
import { Basesendcoin, Basegetcoin } from './dto/create-tranfer.dto';
import { Profile } from 'src/profile/entity/profile.entity';
import Sequelize = require('sequelize');
import { stringify } from 'querystring';
import { async } from 'rxjs/internal/scheduler/async';
import { User } from 'src/users/entity/users.entity';
import { setIndexes } from 'sequelize-typescript';
import sequelize = require('sequelize');
import { ProfileWallet } from 'src/profile/dto/create-profile.dto';
const Tx = require('ethereumjs-tx').Transaction;
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/8d1234baedad4a588a49a51ac993aaf8'))

@Injectable()
export class TranferService {
    constructor(@Inject('PROFILES_REPOSITORY') private readonly profile: typeof Profile, 
    @Inject('USERS_REPOSITORY') private user: typeof User) {}

    async SendCoin(Basesendcoin: Basesendcoin) {
        
        const publickeyfrom = await this.getPublicKey(Basesendcoin.from);
        const publickeyto = await this.getPublicKey(Basesendcoin.to);
        const privatekey = await this.getPrivateKey(Basesendcoin.from);
        const hash = await this.sendToken(publickeyfrom.publickey, publickeyto.publickey, Basesendcoin.amount, privatekey.privatekey);
        return hash;

    }

    async getPublicKey(sid: string) {
        const publicKey = await this.profile.findOne({
            plain: true,
            attributes: ['publickey'],
            where: {
                sid: sid
            }
        })
        return publicKey;
    }
    
    async getPrivateKey(sid: string) {
        const privateKey = await this.profile.findOne({
            attributes: ['privatekey'],
            where: {
                sid: sid
            }
        })
        return privateKey;
    }

    async sendToken(from: string, to: string, amount: number, privatekey: string) {
        return new Promise(async (resolve, reject) => {
            const contractAddress = '0x0E618c94FC648369810e0ae581964E5e631a6d82';
            const contractAbi = [
                {
                    "constant": true,
                    "inputs": [],
                    "name": "totalSupply",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "_owner",
                            "type": "address"
                        }
                    ],
                    "name": "balanceOf",
                    "outputs": [
                        {
                            "name": "balance",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_to",
                            "type": "address"
                        },
                        {
                            "name": "_value",
                            "type": "uint256"
                        }
                    ],
                    "name": "transfer",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "name": "Transfer",
                    "type": "event"
                }
            ];
            const contractOwner = {
                addr: '0x35dd8Bcd4f864835cc1D23Eb459506bdA8983cB2',
                key: 'FDF13FBAAD8BD1E5266AC964930B9A7D49CEEF974C87BC161481413447D258C5'
            };
            var count = await web3.eth.getTransactionCount(from);
            var contract = new web3.eth.Contract(contractAbi, contractAddress,{from:from});//จากไหน
            var weiTokenAmount = web3.utils.toWei(amount, 'ether');
            var Transaction = {
                from: from,//จากไหน
                nonce: "0x" + count.toString(16),
                gasPrice: web3.utils.toHex(web3.utils.toWei('3','gwei')),
                gasLimit: "0x250CA",//151754
                to:contractAddress,
                value: "0x0",
                data: contract.methods.transfer(to, weiTokenAmount).encodeABI(),//ถึงไหน
                chainId: 0x01,
            };
            const privKey = Buffer.from(privatekey, 'hex'); // private คนส่ง
            const tx = new Tx(Transaction, { chain: 'ropsten' });
            tx.sign(privKey);
            var serializedTx = tx.serialize();

            web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), (err, txHash) => {
                if (err) {
                    reject(err);
                }
                resolve(txHash);
            });
        })
    }

    async updateBalnce(sid:string){
        return new Promise(async (resolve, reject)=>{
            const contractAddress = '0x0E618c94FC648369810e0ae581964E5e631a6d82';
            const contractAbi = [
                {
                    "constant": true,
                    "inputs": [],
                    "name": "totalSupply",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "_owner",
                            "type": "address"
                        }
                    ],
                    "name": "balanceOf",
                    "outputs": [
                        {
                            "name": "balance",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_to",
                            "type": "address"
                        },
                        {
                            "name": "_value",
                            "type": "uint256"
                        }
                    ],
                    "name": "transfer",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "name": "Transfer",
                    "type": "event"
                }
            ];
            const username = await this.getPublicKey(sid);
            const contract = new web3.eth.Contract(contractAbi,contractAddress);
            await contract.methods.balanceOf(username.publickey).call().then(res=>{
                resolve(res/1000000000000000000)

            })
        })   
    }


    async getBalncePSUCOIN(sid:string){
        const balancenew = await this.updateBalnce(sid);
        const coin=[{coin:balancenew}];
        return coin;
    }

    // async updateTransaction(sid:string , profilewallet:ProfileWallet){
    //     const data = await this.profile.findOne({attributes: ['id'],where:{sid:sid}});
    //     return await data.update(profilewallet);

    // }
  
}
