import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { OwnershipInterestTypeEnum, UnitTypeEnum } from './enum';

export class CreateEmploymentRequestDto {
  @ApiProperty({
    type: String,
    description: 'System-generated, unique identifier of the Employment record',
    example: '84c4c9cc-2e0d-11ed-a261-0242ac120002',
    required: false,
  })
  @IsString()
  @IsOptional()
  id: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  addressCity: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  addressPostalCode: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  addressState: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  addressStreetLine1: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  attention: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  badgeOrEmployeeId: string;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  basePayAmount: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  bonusAmount: number;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  businessName: string;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  businessOwnedPercent: number;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  businessPhone: string;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  commissionsAmount: number;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  countryCode: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  verificationDate: string;

  @ApiProperty({
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  currentEmploymentIndicator: boolean;

  @ApiProperty({
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  doesNotApply: boolean;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  employerComments: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  employerName: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  employmentStartDate: string;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  jobTermMonths: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  baseIncome: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  overTime: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  bonus: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  commission: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  militaryEntitlement: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  otherIncome: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  total: number;

  @ApiProperty({
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  specialEmployerRelationshipIndicator: boolean;

  @ApiProperty({
    required: false,
    enum: OwnershipInterestTypeEnum,
  })
  @IsEnum(OwnershipInterestTypeEnum)
  @IsOptional()
  ownershipInterestType: OwnershipInterestTypeEnum;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  employmentMonthlyIncomeAmount: number;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  endDate: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  fax: string;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  monthlyIncomeAmount: number;

  @ApiProperty({
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  noLinkToDocTrackIndicator: boolean;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  otherAmount: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  overtimeAmount: number;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  positionDescription: string;

  @ApiProperty({
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  printAttachmentIndicator: boolean;

  @ApiProperty({
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  printUserJobTitleIndicator: boolean;

  @ApiProperty({
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  printUserNameIndicator: boolean;

  @ApiProperty({
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  selfEmployedIndicator: boolean;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  startDate: string;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  timeInLineOfWorkMonths: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  timeInLineOfWorkYears: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  timeOnJobTermMonths: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  timeOnJobTermYears: number;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  titleFax: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  titlePhone: string;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  unitNumber: number;

  @ApiProperty({
    required: false,
    enum: UnitTypeEnum,
  })
  @IsEnum(UnitTypeEnum)
  @IsOptional()
  unitType: UnitTypeEnum;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  urla2020StreetAddress: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  verificationRequestDate: string;

  @ApiProperty({
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  individualEmployer: boolean;

  @ApiProperty({
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  militaryEmployer: boolean;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  militaryCombatPay: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  militaryFlightPay: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  militaryHazardPay: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  militaryOverseasPay: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  militaryPropPay: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  clothingAllowance: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  rationsAllowance: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  variableHousingAllowance: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  quartersAllowance: number;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  otherAllowanceDescription: string;

  @ApiProperty({
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  foreignIncome: boolean;

  @ApiProperty({
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  foreignAddressIndicator: boolean;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  country: string;
}
