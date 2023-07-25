import { LockedLoanErrorParserService } from '../../lock/service/locked-loan-error-parser.service';

export class LockedLoanError {
  readonly loanId: string;
  constructor(error: any) {
    this.loanId = LockedLoanErrorParserService.parseLoanId(error);
    console.log(this.loanId);
  }
}
