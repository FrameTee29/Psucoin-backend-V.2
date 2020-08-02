import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { DatabaseModule } from 'src/database/database.module';
import { profilesProviders } from './profile.providers';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports:[DatabaseModule,UsersModule],
  controllers: [ProfileController],
  providers: [ProfileService,...profilesProviders],
  exports:[ProfileService]
})
export class ProfileModule {}
