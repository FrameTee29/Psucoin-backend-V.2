import { Module } from '@nestjs/common';
import { PsuapiService } from './psuapi.service';

@Module({
  providers: [PsuapiService],
  exports:[PsuapiService]
})
export class PsuapiModule {}
