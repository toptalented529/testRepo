import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { TemplatedApiException } from '../templated-api-exception';
import { CreateLoanDto, CreatedLoanDto } from './dto/create-loan.dto';
import { GetLoanDto } from './dto/get-loan.dto';
import { UpdateLoanDto, UpdatedLoanDto } from './dto/update-loan.dto';
import { LoanService } from './loan.service';

@ApiTags('Loan')
@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @ApiOkResponse({
    description: 'Loan created object',
    type: CreatedLoanDto,
  })
  @TemplatedApiException(() => [
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    InternalServerErrorException,
  ])
  @Post()
  @ApiOperation({
    summary: 'Create a Loan',
    description:
      'Creates a new loan and places it in the specified loan folder (e.g. Training or Pipeline).',
  })
  @ApiQuery({
    name: 'loanFolder',
    type: 'string',
    required: true,
  })
  @ApiQuery({
    name: 'templatePath',
    type: 'string',
    required: false,
  })
  @ApiQuery({
    name: 'loId',
    type: 'string',
    required: false,
  })
  create(
    @Body() createLoanDto: CreateLoanDto,
    @Query('loanFolder') loanFolder: string,
    @Query('templatePath') templatePath?: string,
    @Query('loId') loId?: string,
  ): Promise<CreatedLoanDto> {
    return this.loanService.create(
      createLoanDto,
      loanFolder,
      templatePath,
      loId,
    );
  }

  @ApiOkResponse({
    description: 'Loan get response',
    type: GetLoanDto,
  })
  @TemplatedApiException(() => [
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    InternalServerErrorException,
  ])
  @Get(':id')
  @ApiOperation({
    summary: 'Get One Loan',
    description: 'Returns one specific loan.',
  })
  findOneLoan(@Param('id') id: string): Promise<GetLoanDto> {
    return this.loanService.findOne(id);
  }

  @ApiOkResponse({
    description: 'Loan patch response',
    type: CreatedLoanDto,
  })
  @TemplatedApiException(() => [
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    InternalServerErrorException,
  ])
  @ApiQuery({
    name: 'templatePath',
    type: 'string',
    required: false,
  })
  @Patch(':id')
  @ApiOperation({
    summary: 'Update a Loan',
    description: 'Updates an existing loan with new information.',
  })
  update(
    @Param('id') id: string,
    @Body() updateLoanDto: UpdateLoanDto,
    @Query('templatePath') templatePath?: string,
  ): Promise<UpdatedLoanDto> {
    return this.loanService.update(id, updateLoanDto, templatePath);
  }
}
