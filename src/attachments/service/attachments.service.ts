import { Injectable } from '@nestjs/common';

import { UnlockLoanHttpDecoratorService } from '../../shared/service/unlock-loan-http-decorator.service';
import { CreateAttachmentBodyDto } from '../dto/request';

@Injectable()
export class AttachmentsService {
  constructor(
    private readonly httpServiceDecorator: UnlockLoanHttpDecoratorService,
  ) {}

  async createAttachment(
    loanId: string,
    createAttachmentBody: CreateAttachmentBodyDto,
  ): Promise<JSON> {
    const url = `${process.env.ENCOMPASS_LOAN_BASE}/v3/loans/${loanId}/attachmentUploadUrl`;

    return await this.httpServiceDecorator.post(url, createAttachmentBody);
  }
}
