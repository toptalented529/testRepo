import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Query,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TemplatedApiException } from '../../templated-api-exception';
import { valOptions } from '../../app/api-config'; //Remove when it's not neccesary due that we are setting this config in main.ts as general config
import {
  BindBorrowerToLoanBody,
  BindBorrowerToLoanResponse,
  BorrowerContactInfo,
  BorrowerUuid,
  GetBorrowerUuidParams,
} from '../dto/borrower.dto';
import { BorrowerService } from '../service/borrower.service';

@ApiTags('Borrower')
@Controller('borrower')
@UsePipes(new ValidationPipe(valOptions))
export class BorrowerController {
  constructor(private readonly borrowerService: BorrowerService) {}

  @Get('uuid') // Get Borrower's Uuid (Uuid is referred to as subject in response)
  @ApiOperation({
    summary: 'Get Borrower UUID (subject)',
    description: 'Generates a unique UUID (subject) for the borrower.',
  })
  @ApiOkResponse({
    description: 'Borrower Uuid (subject)',
    type: BorrowerUuid,
  })
  @TemplatedApiException(() => [
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    InternalServerErrorException,
  ])
  getBorrowerUuid(
    @Query() getBorrowerUuidParams: GetBorrowerUuidParams,
  ): Promise<BorrowerUuid> {
    return this.borrowerService.getBorrowerUuid(getBorrowerUuidParams);
  }

  @Get('/contacts/:loanId') // Get Borrower's contact info (Loan Id is needed) to confirm if UUID is present
  @ApiOperation({
    summary: 'Get Contact Info',
    description:
      "Returns a borrower's contact information. This will confirm whether a borrower has been binded to a loan if the UUID is present in the response.",
  })
  @ApiOkResponse({
    description: 'Borrower contact information',
    type: [BorrowerContactInfo],
  })
  @TemplatedApiException(() => [
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    InternalServerErrorException,
  ])
  getBorrowerContactInfo(
    @Param('loanId') loanId: string,
  ): Promise<BorrowerContactInfo[]> {
    return this.borrowerService.getBorrowerContactInfo(loanId);
  }

  @Post('/contacts') // Bind borrower to loan
  @ApiOperation({
    summary: 'Bind Borrower to Loan',
    description: 'Binds a specified borrower to a particular loan.',
  })
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Bind borrower to loan',
    type: BindBorrowerToLoanResponse,
  })
  @TemplatedApiException(() => [
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    InternalServerErrorException,
  ])
  bindBorrowerToLoan(
    @Body() bindBorrowerToLoanBody: BindBorrowerToLoanBody,
  ): Promise<BindBorrowerToLoanResponse> {
    return this.borrowerService.bindBorrowerToLoan(bindBorrowerToLoanBody);
  }
}
