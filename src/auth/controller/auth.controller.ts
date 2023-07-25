import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { valOptions } from '../../app/api-config'; //Remove when it's not neccesary due that we are setting this config in main.ts as general config
import { TemplatedApiException } from '../../templated-api-exception';
import {
  AuthTokenDto,
  AuthTokenParamsDto,
  ImpersonationTokenDto,
  ImpersonationTokenParamsDto,
  IntrospectionTokenBodyDto,
  IntrospectionTokenInfo,
  RevokeTokenBodyDto,
} from '../dto';
import { AuthGateway } from '../service/auth-gateway.service';
import { TokenService } from '../service/token.service';

@ApiTags('Auth')
@Controller('auth')
@UsePipes(new ValidationPipe(valOptions))
export class AuthController {
  constructor(
    private readonly authGateway: AuthGateway,
    private readonly tokenService: TokenService,
  ) {}

  @Post('token') // Get Auth Token
  @ApiOperation({
    summary: 'Get Auth Token',
    description: 'Generates a new Bearer token for the user.',
  })
  @ApiOkResponse({
    description: 'Authorization token for the user',
    type: AuthTokenDto,
  })
  @TemplatedApiException(() => [
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    InternalServerErrorException,
  ])
  @ApiConsumes('application/x-www-form-urlencoded')
  async getAuthToken(
    @Body() tokenRequestBody: AuthTokenParamsDto,
  ): Promise<AuthTokenDto> {
    return await this.tokenService.getAuthTokenForExternalConsumer(
      tokenRequestBody,
    );
  }

  @Post('token/introspection') // Gets token status and metadata of the token
  @ApiOperation({
    summary: 'Token Introspection',
    description: 'Returns metadata and information about current Bearer token.',
  })
  @ApiOkResponse({
    description: 'Token status and metadata',
    type: IntrospectionTokenInfo,
  })
  @TemplatedApiException(() => [
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    InternalServerErrorException,
  ])
  @ApiConsumes('application/x-www-form-urlencoded')
  async tokenIntrospection(
    @Body() introspectionTokenBody: IntrospectionTokenBodyDto,
  ): Promise<IntrospectionTokenInfo> {
    return await this.authGateway.tokenIntrospection(introspectionTokenBody);
  }

  @Post('token/revoke') // Revokes the supplied access token
  @ApiOperation({
    summary: 'Revoke Token',
    description: 'Revokes a Bearer token that has been issued.',
  })
  @ApiOkResponse({
    description: 'Token revocation status text',
  })
  @TemplatedApiException(() => [
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    InternalServerErrorException,
  ])
  @ApiConsumes('application/x-www-form-urlencoded')
  async revokeToken(@Body() revokeTokenBody: RevokeTokenBodyDto): Promise<any> {
    return await this.authGateway.revokeToken(revokeTokenBody);
  }

  @Post('impersonation-token')
  @ApiOperation({
    summary: 'Get Impersonation Token',
    description: 'Generates a impersonation token.',
  })
  @ApiOkResponse({
    description: 'Impersonation token.',
    type: ImpersonationTokenDto,
  })
  @TemplatedApiException(() => [
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    InternalServerErrorException,
  ])
  async getImpersonationToken(
    @Body() impersonationTokenParamsDto: ImpersonationTokenParamsDto,
  ): Promise<ImpersonationTokenDto> {
    const authToken = await this.tokenService.getAuthTokenForExternalConsumer(
      impersonationTokenParamsDto.authTokenParams,
    );

    return await this.authGateway.getImpersonationToken(
      authToken,
      impersonationTokenParamsDto,
    );
  }
}
