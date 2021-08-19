import { Test, TestingModule } from '@nestjs/testing';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BoardsRepository } from './boards.repository';
import spyOn = jest.spyOn;

describe('BoardsController', () => {
  let boardsController: BoardsController;

  const mockBoardsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardsController],
      providers: [
        BoardsService,
        {
          provide: getRepositoryToken(BoardsRepository),
          useValue: {},
        },
      ],
    }).overrideProvider(BoardsService).useValue(mockBoardsService).compile();

    boardsController = module.get<BoardsController>(BoardsController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(boardsController).toBeDefined();
  });

  describe('create', () => {
    it('should call boardsService.create', () => {
      spyOn(mockBoardsService, 'create');
      boardsController.create({ name: 'a', description: 'b' });
      expect(mockBoardsService.create).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should call boardsService.findAll', () => {
      spyOn(mockBoardsService, 'findAll');
      boardsController.findAll();
      expect(mockBoardsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call boardsService.findOne', () => {
      spyOn(mockBoardsService, 'findOne');
      boardsController.findOne('1');
      expect(mockBoardsService.findOne).toHaveBeenCalled();
    });
  });

  describe('updateOne', () => {
    it('should call boardsService.update', () => {
      spyOn(mockBoardsService, 'update');
      boardsController.update('1', { name: 'a' });
      expect(mockBoardsService.update).toHaveBeenCalled();
    });
  });
});
