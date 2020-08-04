import { Injectable } from '@nestjs/common';

@Injectable()
export class PsuapiService {


    // Login ด้วย PSUPASSPORT 
    async createaccoutwithPsupassport(username:string , password:string){
        console.log(username+password)
    }

}
