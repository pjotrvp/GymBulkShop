import { Injectable, OnApplicationShutdown } from '@nestjs/common';

@Injectable()
export class Neo4jService implements OnApplicationShutdown {
    onApplicationShutdown(signal?: string) {
        throw new Error('Method not implemented.');
    }

}