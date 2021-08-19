import { Test, TestingModule } from '@nestjs/testing';
import { BoardsService } from './boards.service';
import { NotFoundException } from '@nestjs/common';
import { boardsErrors } from './boards.errors';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BoardsRepository } from './boards.repository';
import spyOn = jest.spyOn;
import mock = jest.mock;
import exp from 'constants';

describe('BoardsService', () => {
  let service: BoardsService;

  const mockBoardsRepository = {
    createBoard: jest.fn((dto) => {
      return {
        ...dto,
        id: Date.now(),
      };
    }),
    getAll: jest.fn(() => {
      return [
        {
          name: 'board_1',
          description: 'test_description',
        },
      ];
    }),
    getOne: jest.fn((id) => {
      return id === '1'
        ? { id: '1', name: 'test_board', description: 'test_text' }
        : new NotFoundException(boardsErrors.NOT_FOUND);
    }),
    updateOne: jest.fn((id, dto) => {
      return id === '1'
        ? { id: '1', name: 'board_1', description: 'new_description' }
        : new NotFoundException(boardsErrors.NOT_FOUND);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardsService,
        {
          provide: getRepositoryToken(BoardsRepository),
          useValue: mockBoardsRepository,
        },
      ],
    }).compile();

    service = module.get<BoardsService>(BoardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call repository', () => {
      spyOn(mockBoardsRepository, 'createBoard');
      service.create({ name: 'a', description: 'b' });
      expect(mockBoardsRepository.createBoard).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should call repository', () => {
      spyOn(mockBoardsRepository, 'getAll');
      service.findAll();
      expect(mockBoardsRepository.getAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call repository', () => {
      spyOn(mockBoardsRepository, 'getOne');
      service.findOne('1');
      expect(mockBoardsRepository.getOne).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should call repository', () => {
      spyOn(mockBoardsRepository, 'updateOne');
      service.update('1', { name: 'a', description: 'b' });
      expect(mockBoardsRepository.updateOne).toHaveBeenCalled();
    });
  });
});
