import { Test, TestingModule } from '@nestjs/testing';
import { NEO4J_CONFIG, NEO4J_DRIVER } from './neo4j.constants';
import { Neo4jService } from './neo4j.service';
import { Neo4jModule } from './neo4j.module';

describe('Neo4jService', () => {
  let service: Neo4jService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [Neo4jModule],
      providers: [Neo4jService],
    }).compile();

    service = module.get<Neo4jService>(Neo4jService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
