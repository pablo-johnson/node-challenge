import { Test, TestingModule } from '@nestjs/testing';
import { CompetitionsService } from './competitions.service';
import { FootballDataModule } from '../football-data/football-data.module';

describe('CompetitionsService', () => {
  let service: CompetitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompetitionsService],
      imports: [FootballDataModule]
    }).compile();

    service = module.get<CompetitionsService>(CompetitionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
