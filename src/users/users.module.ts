import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from './entity/users.providers';
import { FinanceModule } from 'src/finance/finance.module';
import { FinanceService } from 'src/finance/finance.service';

@Module({
  imports: [DatabaseModule,FinanceModule],
  controllers: [UsersController],
  providers: [UsersService,FinanceService,...usersProviders],
  exports: [UsersService],
})
export class UsersModule { }
