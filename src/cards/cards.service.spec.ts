import { Test, TestingModule } from '@nestjs/testing';
import { CardsService } from './cards.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CardsRepository } from './cards.repository';
import { ListsService } from '../lists/lists.service';
import spyOn = jest.spyOn;
import { NotFoundException } from '@nestjs/common';

describe('CardsService', () => {
  let service: CardsService;
  const mockCardsRepository = {
    createCard: jest.fn(),
    getOne: jest.fn(),
    removeOne: jest.fn(),
  };
  const mockListsService = {
    findOne: jest.fn((id) => {
      if (id === 1) {
        return { name: 'a', desc: 'b' };
      } else {
        throw new NotFoundException();
      }
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        ListsService,
        {
          provide: getRepositoryToken(CardsRepository),
          useValue: mockCardsRepository,
        },
      ],
    })
      .overrideProvider(ListsService).useValue(mockListsService)
      .compile();

    service = module.get<CardsService>(CardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create',() => {
    it('should call repository if list is found', () => {
      spyOn(mockListsService, 'findOne');
      service.create({ idList: '1', name: 'a', desc: 'b' });
      expect(mockListsService.findOne).toHaveBeenCalled();
    });
    it('should return 404 if list is not found', async () => {
      await expect(
        service.create({ idList: '15', name: 'a', desc: 'b' })
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should call repository', () => {
      spyOn(mockCardsRepository, 'removeOne');
      service.remove('1');
      expect(mockCardsRepository.removeOne).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call repository', () => {
      spyOn(mockCardsRepository, 'getOne');
      service.findOne('1');
      expect(mockCardsRepository.getOne).toHaveBeenCalled();
    });
  });
});
