import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { ResidenceTypeEnum } from './enum';

export class ResidenceDto {
  @ApiProperty({
    type: String,
    description: 'System-generated, unique identifier of the Residence Record',
    required: false,
  })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({
    enum: ResidenceTypeEnum,
    description:
      'Type of Residence, Mandatory. Possible values are: Prior, Current.',
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(ResidenceTypeEnum)
  residencyType: ResidenceTypeEnum;

  @ApiProperty({
    type: String,
    description: 'Name of the Account Holder',
    required: false,
  })
  @IsOptional()
  @IsString()
  accountName?: string;

  @ApiProperty({
    type: String,
    description: 'City of Residence address',
    required: false,
  })
  @IsOptional()
  @IsString()
  addressCity?: string;

  @ApiProperty({
    type: String,
    description: 'Postal Code of Residence address',
    required: false,
  })
  @IsOptional()
  @IsString()
  addressPostalCode?: string;

  @ApiProperty({
    type: String,
    description: 'State of Residence address',
    required: false,
  })
  @IsOptional()
  @IsString()
  addressState?: string;

  @ApiProperty({
    type: String,
    description: 'Street Line 1 of Residence address',
    required: false,
  })
  @IsOptional()
  @IsString()
  addressStreetLine1?: string;

  @ApiProperty({
    type: String,
    description: 'County of Residence address',
    required: false,
  })
  @IsOptional()
  @IsString()
  addressCounty?: string;

  @ApiProperty({
    type: String,
    description: 'Unit Designator Type of Residence address',
    required: false,
  })
  @IsOptional()
  @IsString()
  addressUnitDesignatorType?: string;

  @ApiProperty({
    type: String,
    description: 'Unit Identifier of Residence address',
    required: false,
  })
  @IsOptional()
  @IsString()
  addressUnitIdentifier?: string;

  @ApiProperty({
    type: Boolean,
    description: 'Indicates if this residence does not apply',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  doesNotApplyIndicator?: boolean;

  @ApiProperty({
    type: String,
    description: 'Country Code of Residence address',
    required: false,
  })
  @IsOptional()
  @IsString()
  countryCode?: string;

  @ApiProperty({
    type: String,
    description: 'County of Residence',
    required: false,
  })
  @IsOptional()
  @IsString()
  county?: string;

  @ApiProperty({
    type: Number,
    description: 'Duration of Stay in the residence in months',
    required: false,
  })
  @IsOptional()
  @IsInt()
  durationTermMonths?: number;

  @ApiProperty({
    type: Number,
    description: 'Duration of stay in the residence in years',
    required: false,
  })
  @IsOptional()
  @IsInt()
  durationTermYears?: number;

  @ApiProperty({
    type: String,
    description: 'Attention to landlord',
    required: false,
  })
  @IsOptional()
  @IsString()
  landlordAttention?: string;

  @ApiProperty({
    type: String,
    description: 'City of Landlord',
    required: false,
  })
  @IsOptional()
  @IsString()
  landlordCity?: string;

  @ApiProperty({
    type: String,
    description: 'Comments of Landlord',
    required: false,
  })
  @IsOptional()
  @IsString()
  landlordComments?: string;

  @ApiProperty({
    type: String,
    description: 'Email Address of Landlord',
    required: false,
  })
  @IsOptional()
  @IsString()
  landlordEmail?: string;

  @ApiProperty({
    type: String,
    description: 'Fax Number of Landlord',
    required: false,
  })
  @IsOptional()
  @IsString()
  landlordFax?: string;

  @ApiProperty({
    type: String,
    description: 'Name of Landlord',
    required: false,
  })
  @IsOptional()
  @IsString()
  landlordName?: string;

  @ApiProperty({
    type: String,
    description: 'Phone number of Landlord',
    required: false,
  })
  @IsOptional()
  @IsString()
  landlordPhone?: string;

  @ApiProperty({
    type: String,
    description: 'Postal Code of Landlord',
    required: false,
  })
  @IsOptional()
  @IsString()
  landlordPostalCode?: string;

  @ApiProperty({
    type: String,
    description: 'State of Landlord',
    required: false,
  })
  @IsOptional()
  @IsString()
  landlordState?: string;

  @ApiProperty({
    type: String,
    description: 'Street Address of Landlord',
    required: false,
  })
  @IsOptional()
  @IsString()
  landlordStreet?: string;

  @ApiProperty({
    type: Boolean,
    description:
      'Indicates if a verification document has been added to the loan for this residence',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  noLinkToDocTrackIndicator?: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Indicates if an attachment is to be printed',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  printAttachmentIndicator?: boolean;

  @ApiProperty({
    type: Boolean,
    description:
      'Indicates if the job title of the user verifying the residence should be printed',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  printUserJobTitleIndicator?: boolean;

  @ApiProperty({
    type: Boolean,
    description:
      'Indicates if the name of the user verifying the residence should be printed',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  printUserNameIndicator?: boolean;

  @ApiProperty({
    type: Number,
    description: 'Rent Amount for the residence',
    required: false,
  })
  @IsOptional()
  @IsInt()
  rent?: number;

  @ApiProperty({
    type: String,
    description: 'Request Date',
    required: false,
  })
  @IsOptional()
  @IsString()
  requestDate?: string;

  @ApiProperty({
    type: String,
    description: 'Basis Type of Residence',
    required: false,
  })
  @IsOptional()
  @IsString()
  residencyBasisType?: string;

  @ApiProperty({
    type: String,
    description: 'Title of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    type: String,
    description: 'Fax Number of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  titleFax?: string;

  @ApiProperty({
    type: String,
    description: 'Phone Number of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  titlePhone?: string;

  @ApiProperty({
    type: String,
    description: 'Street Address for an URLA 2020 Address',
    required: false,
  })
  @IsOptional()
  @IsString()
  urla2020StreetAddress?: string;

  @ApiProperty({
    type: String,
    description: 'Country of the landlord',
    required: false,
  })
  @IsOptional()
  @IsString()
  landlordCountry?: string;

  @ApiProperty({
    type: Boolean,
    description: "Indicates if the Landlord's address is a foreign address",
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  landlordForeignAddressIndicator?: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Indicates if the residence is a foreign one',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  foreignAddressIndicator?: boolean;

  @ApiProperty({
    type: String,
    description: 'Country of residence',
    required: false,
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({
    type: String,
    description:
      'ReadOnly. altId fields are automatically generated by internal services.',
    required: false,
  })
  @IsOptional()
  @IsString()
  altId?: string;
}
