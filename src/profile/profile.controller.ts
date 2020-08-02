import { Controller, Post, Body } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { BaseCreateWallet } from './dto/create-profile.dto';

@Controller('profile')
export class ProfileController {
    constructor(private ProfileService:ProfileService){}

    // @Post('/createwallet')
    // createWallet(@Body() BaseCreateWallet:BaseCreateWallet){
    //     return this.ProfileService.createwallet(BaseCreateWallet)
    // }

}
