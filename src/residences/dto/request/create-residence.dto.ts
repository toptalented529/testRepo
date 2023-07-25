import { OmitType } from '@nestjs/swagger';
import { ResidenceDto } from '../residence.dto';

export class CreateResidenceDto extends OmitType(ResidenceDto, [
  'id',
  'altId',
]) {}
