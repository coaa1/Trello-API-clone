import { Test, TestingModule } from '@nestjs/testing';
import { ListsService } from './lists.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ListsRepository } from './lists.repository';
import { BoardsService } from '../boards/boards.service';
import { NotFoundException } from '@nestjs/common';

describe('ListsService', () => {
  let service: ListsService;
  const mockListsRepository = {
    createList: jest.fn(),
    getOne: jest.fn(),
    removeOne: jest.fn(),
  };
  const mockBoardsService = {
    findOne: jest.fn((id) => {
      if (id === 1) {
        return { name: 'a', desc: 'b' };
      } else {
        throw new NotFoundException();
      }
    }),
    update: jest.fn((id, dto) => {
      if (id === 1) {
        return { ...dto };
      } else {
        throw new NotFoundException();
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListsService,
        BoardsService,
        {
          provide: getRepositoryToken(ListsRepository),
          useValue: mockListsRepository,
        },
      ],
    })
      .overrideProvider(BoardsService)
      .useValue(mockBoardsService)
      .compile();

    service = module.get<ListsService>(ListsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create',() => {
    it('should call repository if list is found', () => {
      spyOn(mockBoardsService, 'findOne');
      service.create({ idBoard: '1', name: 'a' });
      expect(mockBoardsService.findOne).toHaveBeenCalled();
    });
    it('should return 404 if list is not found', async () => {
      await expect(
        service.create({ idBoard: '15', name: 'a' })
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should call repository', () => {
      spyOn(mockListsRepository, 'getOne');
      service.findOne('1');
      expect(mockListsRepository.getOne).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should call repository', () => {
      spyOn(mockListsRepository, 'removeOne');
      service.remove('1');
      expect(mockListsRepository.removeOne).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should call repository if list is found', () => {
      spyOn(mockBoardsService, 'findOne');
      service.update('1', { idBoard: '1', name: 'a' });
      expect(mockBoardsService.findOne).toHaveBeenCalled();
    });
    it('should return 404 if list is not found', async () => {
      await expect(
        service.update('7', { idBoard: '1', name: 'a' }),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
