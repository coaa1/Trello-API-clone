import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { CardsService } from '../cards/cards.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CommentsRepository } from './comments.repository';

describe('CommentsService', () => {
  let service: CommentsService;
  const mockCardsService = {
    findOne: jest.fn(),
  };
  const mockCommentsRepository = {

  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        CardsService,
        {
          provide: getRepositoryToken(CommentsRepository),
          useValue: mockCommentsRepository,
        },
      ],
    }).overrideProvider(CardsService).useValue(mockCardsService).compile();

    service = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
