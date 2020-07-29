import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { buildDocumentation } from './app/app.swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  buildDocumentation(app);

  await app.listen(3000);
}
bootstrap();
