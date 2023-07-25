import { AxiosError, AxiosResponse } from 'axios';

import { LockedLoanErrorValidatorService } from './locked-loan-error-validator.service';

describe('LockedLoanErrorValidatorService', () => {
  it('should return true if is locked loan error', () => {
    const errorMock = new AxiosError(
      undefined,
      undefined,
      undefined,
      undefined,
      {
        status: 409,
        data: {
          details: "Loan '12345..' is currently locked by another user 'user'.",
        },
      } as AxiosResponse,
    );

    expect(
      LockedLoanErrorValidatorService.isLoanLockedError(errorMock),
    ).toBeTruthy();
  });

  it('should return false if not AxiosError', () => {
    const errorMock = {
      response: {
        status: 409,
        data: {
          details: "Loan '12345..' is currently locked by another user 'user'.",
        },
      },
    };

    expect(
      LockedLoanErrorValidatorService.isLoanLockedError(errorMock),
    ).toBeFalsy();
  });

  it('should return false if code is not 409', () => {
    const errorMock = new AxiosError(
      undefined,
      undefined,
      undefined,
      undefined,
      {
        status: 0,
        data: {
          details: "Loan '12345..' is currently locked by another user 'user'.",
        },
      } as AxiosResponse,
    );

    expect(
      LockedLoanErrorValidatorService.isLoanLockedError(errorMock),
    ).toBeFalsy();
  });

  it("should return false if details doesn't match regex", () => {
    const errorMock = new AxiosError(
      undefined,
      undefined,
      undefined,
      undefined,
      {
        status: 409,
        data: {
          details: 'details',
        },
      } as AxiosResponse,
    );

    expect(
      LockedLoanErrorValidatorService.isLoanLockedError(errorMock),
    ).toBeFalsy();
  });
});
