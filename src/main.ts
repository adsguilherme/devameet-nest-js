import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log', 'warn'], // Definição de logs que desejamos que seja impresso no console da nossa aplicação.
  });

  app.enableCors(); // Hablitando CORS

  // Adicionar nossa configuração nos pipes de validação
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );

  app.setGlobalPrefix('api'); // Setando prefixo global para a rota e neste caso será chamado de api.

  await app.listen(3000);
}
bootstrap();
