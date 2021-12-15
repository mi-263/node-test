import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
      .setTitle('Node Test API')
      .setDescription('Node Test api')
      .setVersion('1.0.0')
      .addTag('auth')
      .addBearerAuth(
          {
            // I was also testing it without prefix 'Bearer ' before the JWT
            description: `[just text field] Please enter token in following`,
            name: 'Authorization',
            bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
            scheme: 'Bearer',
            type: 'http', // I`ve attempted type: 'apiKey' too
            in: 'Header',
          },
          'authorization',
      )
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3002);
  console.log('Server listening on port ' + 3002);
}
bootstrap();
