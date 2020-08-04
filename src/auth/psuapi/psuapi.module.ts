import { Module } from '@nestjs/common';
import { PsuapiService } from './psuapi.service';

@Module({
  providers: [PsuapiService]
})
export class PsuapiModule {}
