export class LockedLoanErrorValidatorService {
  static isLoanLockedError(error: any) {
    if (!error.isAxiosError) {
      return false;
    }
    const regex = new RegExp(
      `Loan '.*' is currently locked by another user '.*'.`,
    );

    return (
      error.response?.status === 409 && regex.test(error.response?.data.details)
    );
  }
}
