import { Injectable } from '@nestjs/common';
import  loginPSUPassport  from './psuapi';

@Injectable()
export class PsuapiService {


    // Login ด้วย PSUPASSPORT 
    async createaccoutwithPsupassport(username:string , password:string){
        await loginPSUPassport(username,password);
    }

}
