import { Test, TestingModule } from '@nestjs/testing';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CardsRepository } from './cards.repository';
import { CommentsService } from '../comments/comments.service';
import spyOn = jest.spyOn;

describe('CardsController', () => {
  let controller: CardsController;

  const mockCardsService = {
    create: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };
  const mockCommentsService = {
    create: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [
        CardsService,
        CommentsService,
        {
          provide: getRepositoryToken(CardsRepository),
          useValue: {},
        },
      ],
    })
      .overrideProvider(CardsService)
      .useValue(mockCardsService)
      .overrideProvider(CommentsService)
      .useValue(mockCommentsService)
      .compile();

    controller = module.get<CardsController>(CardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call cards service', () => {
      spyOn(mockCardsService, 'create');
      controller.create({ idList: '1', name: 'a', desc: 'b'})
      expect(mockCardsService.create).toHaveBeenCalled();
    });
  });

  describe('createComment', () => {
    it('should call comments service', () => {
      spyOn(mockCommentsService, 'create');
      controller.createComment({ idCard: 'a', text: 'b' });
      expect(mockCardsService.create).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call comments service', () => {
      spyOn(mockCardsService, 'findOne');
      controller.findOne('a');
      expect(mockCardsService.create).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should call comments service', () => {
      spyOn(mockCardsService, 'remove');
      controller.remove('a');
      expect(mockCardsService.remove).toHaveBeenCalled();
    });
  });
});
