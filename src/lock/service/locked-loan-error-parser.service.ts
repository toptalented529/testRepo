export class LockedLoanErrorParserService {
  static parseLoanId(error: any) {
    if (!error.isAxiosError) {
      throw new Error('error is not an instance of AxiosError');
    }

    const regex = new RegExp(
      "Loan '(.*)' is currently locked by another user '.*'.",
    );
    const matches = regex.exec(error.response?.data.details);

    if (!matches || matches.length < 2) {
      throw new Error(`Invalid error response ${error.response?.data}`);
    }

    return matches[1];
  }
}
