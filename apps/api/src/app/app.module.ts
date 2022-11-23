import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Neo4jModule } from 'nest-neo4j';

@Module({
  imports: [
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
