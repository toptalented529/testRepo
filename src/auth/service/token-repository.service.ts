import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IEncompassToken } from '../interface/application.interface';
import { EncompassToken } from '../../schemas/EncompassToken.schema';
import { AuthTokenDto } from '../dto';

@Injectable()
export class TokenRepositoryService {
  constructor(
    @InjectModel('EncompassToken')
    private readonly encompassTokenModel: Model<IEncompassToken>,
  ) {}

  async updateAuthToken(
    clientId: string,
    authToken: AuthTokenDto,
  ): Promise<void> {
    const filter = {
      clientId: clientId,
    };

    const update = {
      authToken: authToken,
    };

    await this.encompassTokenModel.findOneAndUpdate(filter, update);
  }

  async get(clientId: string): Promise<IEncompassToken> {
    return await this.encompassTokenModel
      .findOne({
        clientId: clientId,
      })
      .exec();
  }

  async create(
    applicationName: string,
    authToken: AuthTokenDto,
  ): Promise<IEncompassToken> {
    const document = new EncompassToken(applicationName, authToken);
    return await this.encompassTokenModel.create(document);
  }
}
