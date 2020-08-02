import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { TranferService } from './tranfer.service';
import { Basesendcoin, Basegetcoin } from './dto/create-tranfer.dto';
import { setIndexes } from 'sequelize-typescript';

@Controller('tranfer')
export class TranferController {

    constructor(private tranferService : TranferService){}

    @Post('/sendcoin')
    sendCoin(@Body() Basesendcoin:Basesendcoin){
        return this.tranferService.SendCoin(Basesendcoin);
    }

    @Get('/balanceof/:sid')
    getBalance(@Param('sid') sid:string){
        return this.tranferService.getBalncePSUCOIN(sid);
    }
}
