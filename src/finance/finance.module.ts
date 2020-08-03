import { Module } from '@nestjs/common';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { usersProviders } from 'src/users/entity/users.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [FinanceController],
  providers: [FinanceService,...usersProviders],
  exports:[FinanceService]
})
export class FinanceModule {}
