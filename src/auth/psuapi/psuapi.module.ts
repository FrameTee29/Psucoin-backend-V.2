import { Module } from '@nestjs/common';
import { PsuapiService } from './psuapi.service';
import { UsersModule } from 'src/users/users.module';
import { usersProviders } from 'src/users/entity/users.providers';

@Module({
  imports:[UsersModule],
  providers: [PsuapiService,...usersProviders],
  exports:[PsuapiService]
})
export class PsuapiModule {}
