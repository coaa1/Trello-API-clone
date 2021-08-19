import { Test, TestingModule } from '@nestjs/testing';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ListsRepository } from './lists.repository';
import { NotFoundException } from '@nestjs/common';

describe('ListsController', () => {
  let listsController: ListsController;

  const mockListsService = {
    create: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListsController],
      providers: [
        ListsService,
        {
          provide: getRepositoryToken(ListsRepository),
          useValue: {},
        },
      ],
    }).overrideProvider(ListsService).useValue(mockListsService).compile();

    listsController = module.get<ListsController>(ListsController);
  });

  it('should be defined', () => {
    expect(listsController).toBeDefined();
  });

  describe('create', () => {
    it('should call lists service', () => {
      spyOn(mockListsService, 'create');
      listsController.create({ name: 'a', idBoard: '1' });
      expect(mockListsService.create).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call lists service', () => {
      spyOn(mockListsService, 'findOne');
      listsController.findOne('1');
      expect(mockListsService.findOne).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should call lists service', () => {
      spyOn(mockListsService, 'update');
      listsController.update('1', { name: 'a', idBoard: '1' });
      expect(mockListsService.update).toHaveBeenCalled();
    });
  });
});
