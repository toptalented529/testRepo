// templated-api-exception.ts

import { buildTemplatedApiExceptionDecorator } from '@nanogiants/nestjs-swagger-api-exception-decorator';

export const TemplatedApiException = buildTemplatedApiExceptionDecorator({
  statusCode: '$status',
  timestamp: '01.01.1970T15:30:11',
  path: 'string',
  method: 'string',
  errorName: 'string',
  message: '$description',
  response: {
    status: '$status',
    message: '$description',
    error: 'Test Error not found.',
  },
});
