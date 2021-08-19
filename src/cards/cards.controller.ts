import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Query,
  ValidationPipe,
  Inject,
  Put,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { CommentsService } from '../comments/comments.service';

@Controller('cards')
export class CardsController {
  constructor(
    private readonly cardsService: CardsService,
    @Inject(CommentsService) private commentService: CommentsService,
  ) {}

  @Post()
  create(@Query(new ValidationPipe()) createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Post(':id/actions/comments')
  createComment(
    @Query(new ValidationPipe()) createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.create(createCommentDto);
  }

  @Get(':id/actions')
  getCommentsForCard(@Param('id') id: string) {
    return this.commentService.getCommentsForCard(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Query(new ValidationPipe()) updateCardDto: UpdateCardDto) {
    return this.cardsService.update(id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsService.remove(id);
  }
}
