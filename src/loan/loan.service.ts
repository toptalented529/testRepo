import { FcLoggerService } from '@firstclose/utilities-lib';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs';
import { UnlockLoanHttpDecoratorService } from '../shared/service/unlock-loan-http-decorator.service';
import { CreateLoanDto, CreatedLoanDto } from './dto/create-loan.dto';
import { GetLoanDto } from './dto/get-loan.dto';
import { UpdateLoanDto, UpdatedLoanDto } from './dto/update-loan.dto';

@Injectable()
export class LoanService {
  private readonly encompassBaseUrl = `${process.env.ENCOMPASS_LOAN_BASE}/v3/loans`;

  constructor(
    private readonly httpServiceDecorator: UnlockLoanHttpDecoratorService,
    private readonly logger: FcLoggerService,
  ) {}

  async create(
    createLoanDto: CreateLoanDto,
    loanFolder: string,
    templatePath?: string,
    loId?: string,
  ): Promise<CreatedLoanDto> {
    const url =
      `${this.encompassBaseUrl}` +
      `?view=entity&loanFolder=${loanFolder}` +
      (templatePath
        ? `&templatePath=${templatePath}&templateType=templateSet`
        : '') +
      (loId ? `&loId=${loId}` : '');

    return await this.httpServiceDecorator.post(url, createLoanDto);
  }

  async findOne(id: string): Promise<GetLoanDto> {
    const url = `${this.encompassBaseUrl}/${id}`;
    const data = await this.httpServiceDecorator.get(url);

    return { data };
  }

  async update(
    id: string,
    updateLoanDto: UpdateLoanDto,
    templatePath?: string,
  ): Promise<UpdatedLoanDto> {
    this.logger.debug(`Updating loanId: ${id}`);
    const url =
      `${this.encompassBaseUrl}/${id}?view=entity` +
      (templatePath
        ? `&templatePath=${templatePath}&templateType=templateSet`
        : '');

    const mapCallback = map((res: AxiosResponse) => {
      return { data: res.data, status: res.status };
    });

    const res = await this.httpServiceDecorator.patch(
      url,
      updateLoanDto,
      undefined,
      mapCallback,
    );

    this.logger.debug(
      `Update loan ${id} Encompass response status: ${JSON.stringify(
        res.status,
      )}`,
    );

    return { data: res.data };
  }
}
