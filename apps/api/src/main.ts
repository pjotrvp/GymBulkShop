import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import passport = require('passport');

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  
    const port = process.env.PORT || 3000;
    
    const config = new DocumentBuilder()
    .setTitle('GymBulkShop API')
    .setDescription('The GymBulkShop API')
    .build();
    
  app.use(passport.initialize());
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
  Logger.log(
    `🚀🤓 Application 🤓 is 🤓 running 🤓 on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
