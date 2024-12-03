import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
console.log(process.env.CORS);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = (
    process.env.ALLOWED_ORIGINS || 'http://localhost:5173'
  ).split(',');

  app.enableCors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
