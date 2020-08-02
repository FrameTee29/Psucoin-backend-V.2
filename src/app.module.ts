import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { TranferModule } from './tranfer/tranfer.module';
import { SignupModule } from './signup/signup.module';




@Module({
  imports: [UsersModule, DatabaseModule, AuthModule, ProfileModule, TranferModule, SignupModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
