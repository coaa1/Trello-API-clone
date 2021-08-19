import {
  Controller,
  Delete,
  Param,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('actions')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Put('/:id/text')
  update(
    @Query(new ValidationPipe()) updateCommentDto: UpdateCommentDto,
    @Param('id') id: string,
  ) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
