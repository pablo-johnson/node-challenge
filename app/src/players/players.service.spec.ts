import { Test, TestingModule } from '@nestjs/testing';
import { PlayersService } from './players.service';
import { Player } from './player.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoachesService } from '../coaches/coaches.service';
import { mockedPlayerCreateDto, mockedPlayer, mockedTeam } from '../../test/mock-data';

describe('PlayersService', () => {
  let service: PlayersService;
  let playersRepository: Repository<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayersService,
        {
          provide: getRepositoryToken(Player),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PlayersService>(PlayersService);
    playersRepository = module.get<Repository<Player>>(
      getRepositoryToken(Player),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('savePlayer', () => {
    it("should save the given playerCreateDto and return the saved player", async () => {
      jest
        .spyOn(playersRepository, 'save')
        .mockImplementation(
          jest.fn(() => Promise.resolve(mockedPlayer)),
        );

      const result = await service.savePlayer(mockedPlayerCreateDto);

      expect(playersRepository.save).toBeCalledTimes(1);
      expect(result).toEqual(mockedPlayer)
    })
  })

  describe('savePlayers', () => {
    it("should save the given playerCreateDtos and return the saved players", async () => {
      jest
        .spyOn(playersRepository, 'save')
        .mockImplementation(
          jest.fn(() => Promise.resolve(mockedPlayer)),
        );

      const result = await service.savePlayers([mockedPlayerCreateDto, mockedPlayerCreateDto], mockedTeam);

      expect(playersRepository.save).toBeCalledTimes(2);
      expect(result).toEqual([mockedPlayer, mockedPlayer])
    })
  })
});
