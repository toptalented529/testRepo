import { Document } from 'mongoose';
import { AuthTokenDto } from '../dto';

export interface IEncompassToken extends Document {
  clientId: string;
  authToken: AuthTokenDto;
  updatedAt: Date;
}
