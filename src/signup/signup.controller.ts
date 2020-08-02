import { Controller ,Post, Body} from '@nestjs/common';
import { SignupService } from './signup.service';
import { DetailSignup } from './dto/create-signup.dto';
import { ProfileService } from 'src/profile/profile.service';
import { UsersService } from 'src/users/users.service';

@Controller('signup')
export class SignupController {

    constructor(private signupService : SignupService,
        private ProfileService:ProfileService,
        private usersService: UsersService,){}

    @Post('/register')
    async signupaccount(@Body() DetailSignup:DetailSignup){
        return this.signupService.Register(DetailSignup);
    }


}
