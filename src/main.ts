import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { HttpErrorFilter } from './http-exception.filter';
import { NewrelicInterceptor } from './newrelic.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'log', 'error'],
  });
  app.useGlobalFilters(new HttpErrorFilter());
  //app.useGlobalPipes(new ValidationPipe(valOptions));
  app.setGlobalPrefix('/api/v1');
  app.useGlobalInterceptors(new NewrelicInterceptor());

  const config = new DocumentBuilder()
    .setTitle('ICE Integration API')
    .setDescription('API designed to connect to Encompass API')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-explorer', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
}

bootstrap();
