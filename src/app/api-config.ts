import { ValidationError, ValidatorOptions } from 'class-validator';

export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}

// https://docs.nestjs.com/techniques/validation
export const valOptions: ValidationPipeOptions = {
  whitelist: true,
  transform: true,
  disableErrorMessages: false,
  forbidUnknownValues: true,
  // ensures that extra properties are not accepted in request
  forbidNonWhitelisted: true,
};
