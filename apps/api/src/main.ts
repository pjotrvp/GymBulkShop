import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';


import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 },
    }),
    )
    const port = process.env.PORT || 3333;
    
    const config = new DocumentBuilder()
    .setTitle('GymBulkShop API')
    .setDescription('The GymBulkShop API')
    .build();
    
    app.use(passport.initialize());
    app.use(passport.session());
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
  Logger.log(
    `🚀🤓 Application 🤓 is 🤓 running 🤓 on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
