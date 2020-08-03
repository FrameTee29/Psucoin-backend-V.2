import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { FinanceService } from 'src/finance/finance.service';
import { FinanceModule } from 'src/finance/finance.module';


@Module({
  imports: [UsersModule, PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  UsersModule,FinanceModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy,],
  exports: [AuthService],
})
export class AuthModule { }
