import { FcHttpBaseModule, FcLoggerModule } from '@firstclose/utilities-lib';
import { Global, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { LockModule } from '../lock/lock.module';

@Global()
@Module({
  imports: [
    FcHttpBaseModule.register(),
    FcLoggerModule,
    AuthModule,
    LockModule,
  ],
  exports: [FcHttpBaseModule, FcLoggerModule, AuthModule, LockModule],
})
export class GlobalModule {}
