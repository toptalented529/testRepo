import { FcLoggerService } from '@firstclose/utilities-lib';
import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TemplatedApiException } from '../../templated-api-exception';
import { CreateAttachmentBodyDto } from '../dto/request';
import { AttachmentsService } from '../service/attachments.service';

@ApiTags('Attachments')
@Controller('attachments')
export class AttachmentsController {
  constructor(
    private readonly attachmentsService: AttachmentsService,
    private readonly logger: FcLoggerService,
  ) {}

  @ApiOkResponse({
    description: 'Response for creating an attachment',
  })
  @TemplatedApiException(() => [
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    InternalServerErrorException,
  ])
  @Patch(':loanId')
  @ApiOperation({
    summary: 'Create an Attachment',
    description: 'Creates an upload URL for an attachment.',
  })
  @ApiBody({ type: CreateAttachmentBodyDto })
  createAttachment(
    @Param('loanId') loanId: string,
    @Body() createAttachmentBody: CreateAttachmentBodyDto,
  ): Promise<JSON> {
    return this.attachmentsService
      .createAttachment(loanId, createAttachmentBody)
      .catch((err) => {
        this.logger.error(err.message);
        throw new InternalServerErrorException(
          err.message ?? 'Internal Server Error',
        );
      });
  }
}
