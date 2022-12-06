
import { Module, DynamicModule, Global, Provider } from '@nestjs/common';
import { Neo4jConfig } from 'nest-neo4j/dist';

@Module({})
export class Neo4jModule {

    // static forRoot(config: Neo4jConfig): DynamicModule {
    //     return {
    //         module: Neo4jModule,
    //         providers: [
    //             {
    //                 provide: NEO4J_CONFIG,
    //                 useValue: config,
    //             },
    //             Neo4jService,
    //         ],
    //         exports: [Neo4jService],
    //     };
    // }

}