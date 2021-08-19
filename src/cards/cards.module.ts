import { forwardRef, Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { CommentsModule } from '../comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsRepository } from './cards.repository';
import { ListsModule } from '../lists/lists.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CardsRepository]),
    forwardRef(() => CommentsModule),
    ListsModule,
  ],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}
