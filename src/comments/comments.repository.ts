import { EntityRepository, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CommentsModule } from './comments.module';
import { Card } from '../cards/entities/card.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { commentsErrors } from './comments.errors';

@EntityRepository(Comment)
export class CommentsRepository extends Repository<CommentsModule> {
  async createComment(card: Card, createCommentDto: CreateCommentDto) {
    const { text } = createCommentDto;
    const newComment = new Comment();
    newComment.card = card;
    newComment.text = text;
    return await newComment.save();
  }

  async updateOne(id, updateCommentDto: Partial<UpdateCommentDto>) {
    const exists = await this.findOne({ where: { id } });
    if (!exists) {
      throw new NotFoundException(commentsErrors.NOT_FOUND);
    }
    await this.update({ id }, updateCommentDto);
    return this.findOne({ id });
  }

  async getCommentsForCard(card: Card) {
    return this.createQueryBuilder('comment')
      .where('comment.cardId=:cardId', { cardId: card.id })
      .getMany();
  }

  public async removeOne(id: string): Promise<void> {
    const exists = await this.findOne({ where: { id } });
    if (!exists) {
      throw new NotFoundException(commentsErrors.NOT_FOUND);
    }
    await this.delete({ id });
  }
}
