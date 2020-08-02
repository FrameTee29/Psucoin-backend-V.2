import { Module } from '@nestjs/common';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { ProfileModule } from 'src/profile/profile.module';
import { usersProviders } from 'src/users/users.providers';
import { profilesProviders } from 'src/profile/profile.providers';

@Module({
  imports:[DatabaseModule,UsersModule,ProfileModule],
  controllers: [SignupController],
  providers: [SignupService,...usersProviders,...profilesProviders],
})
export class SignupModule {}
