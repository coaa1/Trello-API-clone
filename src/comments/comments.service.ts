import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CardsService } from '../cards/cards.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentsRepository } from './comments.repository';
import { cardsErrors } from '../cards/cards.errors';

@Injectable()
export class CommentsService {
  constructor(
    @Inject(CardsService) private cardsService: CardsService,
    @InjectRepository(CommentsRepository) private commentsRepository: CommentsRepository,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const card = await this.cardsService.findOne(createCommentDto.idCard);
    if (!card) {
      throw new NotFoundException(cardsErrors.NOT_FOUND);
    }
    return this.commentsRepository.createComment(card, createCommentDto);
  }

  async getCommentsForCard(cardId) {
    const card = await this.cardsService.findOne(cardId);
    if (!card) {
      throw new NotFoundException(cardsErrors.NOT_FOUND);
    }
    return this.commentsRepository.getCommentsForCard(card);
  }

  update(id: string, updateCommentDto: Partial<UpdateCommentDto>) {
    return this.commentsRepository.updateOne(id, updateCommentDto);
  }

  remove(id: string) {
    return this.commentsRepository.removeOne(id);
  }
}
