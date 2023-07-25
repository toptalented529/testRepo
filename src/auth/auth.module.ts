import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EncompassToken,
  EncompassTokenSchema,
} from '../schemas/EncompassToken.schema';
import { HttpServiceDecoratorService } from '../shared/service/http-service-decorator.service';
import { TokenRefresherHttpServiceDecoratorService } from '../shared/service/token-refresher-http-service-decorator.service';
import { AuthController } from './controller/auth.controller';
import { AuthCredentialsService } from './service/auth-credentials.service';
import { AuthGateway } from './service/auth-gateway.service';
import { TokenRepositoryService } from './service/token-repository.service';
import { TokenService } from './service/token.service';
import { CredentialsGetterService } from './service/credentials-getter.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EncompassToken.name, schema: EncompassTokenSchema },
    ]),
    ConfigModule,
  ],
  exports: [
    AuthGateway,
    TokenRefresherHttpServiceDecoratorService,
    HttpServiceDecoratorService,
    MongooseModule.forFeature([
      { name: EncompassToken.name, schema: EncompassTokenSchema },
    ]),
    AuthCredentialsService,
  ],
  controllers: [AuthController],
  providers: [
    AuthGateway,
    TokenRefresherHttpServiceDecoratorService,
    HttpServiceDecoratorService,
    TokenRepositoryService,
    TokenService,
    AuthCredentialsService,
    CredentialsGetterService,
  ],
})
export class AuthModule {}
