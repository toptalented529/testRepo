import { FcLoggerService } from '@firstclose/utilities-lib';
import { Injectable } from '@nestjs/common';
import { UnlockLoanHttpDecoratorService } from '../../shared/service/unlock-loan-http-decorator.service';
import { AssingDocumentAttachmentDto, CreateDocumentDto } from '../dto/request';
import { GetDocumentDto } from '../dto/response';

@Injectable()
export class DocumentsService {
  private readonly encompassBaseUrl = `${process.env.ENCOMPASS_LOAN_BASE}/v3/loans`;

  constructor(
    private readonly httpServiceDecorator: UnlockLoanHttpDecoratorService,
    private readonly logger: FcLoggerService,
  ) {}

  async getAllDocuments(loanId: string): Promise<GetDocumentDto[]> {
    const url = `${this.encompassBaseUrl}/${loanId}/documents`;
    return await this.httpServiceDecorator.get(url);
  }

  async getDocumentById(
    loanId: string,
    documentId: string,
  ): Promise<GetDocumentDto> {
    const url = `${this.encompassBaseUrl}/${loanId}/documents/${documentId}`;
    return await this.httpServiceDecorator.get(url);
  }

  async createDocument(
    loanId: string,
    createDocumentBody: CreateDocumentDto,
  ): Promise<any> {
    const url = `${process.env.ENCOMPASS_LOAN_BASE}/v1/loans/${loanId}/documents?view=entity`;
    return await this.httpServiceDecorator.post(url, createDocumentBody);
  }

  async assignDocumentAttachment(
    loanId: string,
    documentId: string,
    attachments: AssingDocumentAttachmentDto[],
  ): Promise<any> {
    const url = `${this.encompassBaseUrl}/${loanId}/documents/${documentId}/attachments?action=add&view=entity`;

    this.logger.debug('Assigning document attachments...');
    this.logger.debug(`Request ${JSON.stringify(attachments)}`);
    const data = await this.httpServiceDecorator.patch(url, attachments);

    this.logger.debug('Document attachments assigned.');
    this.logger.debug(`Response ${JSON.stringify(data)}`);
  }
}
