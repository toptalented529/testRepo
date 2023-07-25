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
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { FcLoggerService } from '@firstclose/utilities-lib';
import { TemplatedApiException } from '../../templated-api-exception';
import { AssingDocumentAttachmentDto, CreateDocumentDto } from '../dto/request';
import { GetDocumentDto } from '../dto/response';
import { DocumentsService } from '../service/documents.service';

@ApiTags('Documents')
@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly logger: FcLoggerService,
  ) {}

  @ApiOkResponse({
    description: 'Response for getting all documents by a loan Id',
    type: () => [GetDocumentDto],
  })
  @TemplatedApiException(() => [
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    InternalServerErrorException,
  ])
  @Get(':loanId/documents')
  @ApiOperation({
    summary: 'Get All Documents',
    description: 'Gets all of the documents under a specific loan.',
  })
  async getAllDocuments(
    @Param('loanId') loanId: string,
  ): Promise<GetDocumentDto[]> {
    return await this.documentsService.getAllDocuments(loanId).catch((err) => {
      this.logger.error(err.message);
      throw new InternalServerErrorException(
        err.message || 'Internal Server Error',
      );
    });
  }

  @ApiOkResponse({
    description: 'Response for getting document by id',
    type: GetDocumentDto,
  })
  @TemplatedApiException(() => [
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    InternalServerErrorException,
  ])
  @Get(':loanId/documents/:documentId')
  @ApiOperation({
    summary: 'Get One Document',
    description: 'Gets a document by its id and the parent loan id.',
  })
  async getDocumentById(
    @Param('loanId') loanId: string,
    @Param('documentId') documentId: string,
  ): Promise<GetDocumentDto> {
    return await this.documentsService
      .getDocumentById(loanId, documentId)
      .catch((err) => {
        this.logger.error(err.message);
        throw new InternalServerErrorException(
          err.message || 'Internal Server Error',
        );
      });
  }

  @TemplatedApiException(() => [
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    InternalServerErrorException,
  ])
  @Post(':loanId/documents')
  @ApiOperation({
    summary: 'Create a Document',
    description: 'Creates a document for a specific loan.',
  })
  @ApiBody({ type: CreateDocumentDto })
  async createDocument(
    @Param('loanId') loanId: string,
    @Body() createDocumentBody: CreateDocumentDto,
  ): Promise<any> {
    return await this.documentsService
      .createDocument(loanId, createDocumentBody)
      .catch((err) => {
        this.logger.error(err.message);
        throw new InternalServerErrorException(
          err.message || 'Internal Server Error',
        );
      });
  }

  @ApiOkResponse({
    description: 'Response for assigning document attachments',
  })
  @TemplatedApiException(() => [
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    InternalServerErrorException,
  ])
  @Patch(':loanId/documents/:documentId/attachments')
  @ApiOperation({
    description: 'Assign document attachments.',
  })
  @ApiBody({ type: () => [AssingDocumentAttachmentDto] })
  async assignDocumentAttachment(
    @Param('loanId') loanId: string,
    @Param('documentId') documentId: string,
    @Body() attachments: AssingDocumentAttachmentDto[],
  ): Promise<any> {
    try {
      this.logger.debug('Executing assigning attachments to document.');
      this.logger.debug(`Request ${JSON.stringify(attachments)}`);
      const result = await this.documentsService.assignDocumentAttachment(
        loanId,
        documentId,
        attachments,
      );
      this.logger.debug('Assigning attachments to document executed.');
      return result;
    } catch (error) {
      this.logger.error(`Error: ${error.message}`);
      throw new InternalServerErrorException(error);
    }
  }
}
