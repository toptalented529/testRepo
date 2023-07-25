import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetBorrowerUuidParams {
  @ApiProperty()
  @IsString()
  identityType: string;

  @ApiProperty()
  @IsString()
  instanceId: string;

  @ApiProperty()
  @IsString()
  realm: string;

  @ApiProperty()
  @IsString()
  userId: string;
}

export class BorrowerUuid {
  @ApiProperty()
  @IsString()
  subject: string;
}

// export class LoanIdDto {
//     @ApiProperty()
//     loanId: string
// }

export class BorrowerContactInfo {
  @ApiProperty()
  @IsString()
  LAT: string;

  @ApiProperty()
  @IsString()
  UUID: string;

  @ApiProperty()
  @IsString()
  authCode: string;

  @ApiProperty()
  @IsString()
  authType: string;

  @ApiProperty()
  @IsString()
  borrowerId: string;

  @ApiProperty()
  @IsString()
  contactType: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  recipientId: string;
}

export class ContactsPostBody {
  @ApiProperty()
  @IsString()
  uuid: string;

  @ApiProperty()
  @IsString()
  borrowerId: string;

  @ApiProperty()
  @IsString()
  contactType: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  recipientId: string;
}

export class BindBorrowerToLoanBody {
  @ApiProperty({
    type: [ContactsPostBody],
  })
  @IsNotEmpty()
  contacts: [ContactsPostBody];

  @ApiProperty()
  @IsString()
  loanId: string;
}

export class LatUrls {
  @ApiProperty()
  @IsString()
  lat: string;

  @ApiProperty()
  @IsString()
  recipientId: string;
}

export class BindBorrowerToLoanResponse {
  @ApiProperty({
    type: [LatUrls],
  })
  latUrls: [LatUrls];
}
