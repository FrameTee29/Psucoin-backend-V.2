import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from './entity/users.providers';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService,...usersProviders],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}