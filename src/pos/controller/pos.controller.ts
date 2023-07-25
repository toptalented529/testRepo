import { Body, Controller, Headers, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreatePackageDto,
  CreateSessionDto,
  PosCredentialDto,
} from '../dto/request';
import { PackageCreatedDto } from '../dto/response';
import { PosService } from '../service/pos.service';

@ApiTags('Pos')
@Controller('pos')
export class PosController {
  constructor(private readonly posService: PosService) {}

  @Post('packages')
  @ApiOperation({
    summary: 'Create Package',
    description: 'Creates a package event',
  })
  async createPackage(
    @Body() createPackageDto: CreatePackageDto,
    @Headers() posCredentialDto: PosCredentialDto,
    @Query('apiRootDomain') apiRootDomain?: string,
  ): Promise<PackageCreatedDto> {
    return await this.posService.createPackage(
      createPackageDto,
      posCredentialDto,
      apiRootDomain,
    );
  }

  @Post('sessions')
  @ApiOperation({
    summary: 'Create Session',
    description: 'Creates a session',
  })
  async createSession(
    @Body() createSessionDto: CreateSessionDto,
    @Headers() posCredentialDto: PosCredentialDto,
    @Query('apiRootDomain') apiRootDomain?: string,
  ): Promise<PackageCreatedDto> {
    return await this.posService.createSession(
      createSessionDto,
      posCredentialDto,
      apiRootDomain,
    );
  }
}
