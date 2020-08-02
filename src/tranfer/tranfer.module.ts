import { Module } from '@nestjs/common';
import { TranferController } from './tranfer.controller';
import { TranferService } from './tranfer.service';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { ProfileModule } from 'src/profile/profile.module';
import { transferProviders } from './tranfer.providers';
import { profilesProviders } from 'src/profile/profile.providers';
import { usersProviders } from 'src/users/users.providers';


@Module({
  imports:[DatabaseModule,UsersModule,ProfileModule],
  controllers: [TranferController],
  providers: [TranferService,...transferProviders,...profilesProviders,...usersProviders],
  exports:[TranferService]
})
export class TranferModule {}
