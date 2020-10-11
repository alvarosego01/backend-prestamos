import { Global, Module } from '@nestjs/common';
import { _LICENSESCHEMA, _ADMINSCHEMA } from './schemas.index';



@Global()
@Module({
  imports: [_LICENSESCHEMA, _ADMINSCHEMA],
  controllers: [],
  providers: [],
  exports: [_LICENSESCHEMA, _ADMINSCHEMA],
})
export class AdminModelModule {}
