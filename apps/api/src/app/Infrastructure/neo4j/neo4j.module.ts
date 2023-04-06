
import {
  Module,
  DynamicModule,
} from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import { Neo4jConfig } from './neo4j-config.interface';
import { NEO4J_CONFIG, NEO4J_DRIVER } from './neo4j.constants';
import { createDriver } from './neo4j.utils';

@Module({
  providers: [
    {
      provide: NEO4J_CONFIG,
      useValue: {
        scheme: 'neo4j+s',
        host: process.env.NEO4J_HOST,
        port: process.env.NEO4J_PORT,
        username: process.env.NEO4J_USER,
        password: process.env.NEO4J_PASSWORD,
        database: process.env.NEO4J_DATABASE,
      },
    },
    {
      provide: NEO4J_DRIVER,
      inject: [NEO4J_CONFIG],
      useFactory: async (options: Neo4jConfig) => {
        return createDriver(options);
      },
    },
    Neo4jService,
  ],
  exports: [Neo4jService],
})
export class Neo4jModule {
  static forRoot(config: Neo4jConfig): DynamicModule {
    return {
      module: Neo4jModule,
      global: true,
      providers: [
        {
          provide: NEO4J_CONFIG,
          useValue: config,
        },
        {
          provide: NEO4J_DRIVER,
          inject: [NEO4J_CONFIG],
          useFactory: async (options: Neo4jConfig) => {
            return createDriver(options);
          },
        },
        Neo4jService,
      ],
      exports: [Neo4jService],
    };
  }
}
