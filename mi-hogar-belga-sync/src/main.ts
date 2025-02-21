import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000; // 🔹 Usa el puerto de la variable de entorno
  await app.listen(port);
  console.log(`🚀 Microservicio corriendo en el puerto ${port}`);
}

bootstrap();
