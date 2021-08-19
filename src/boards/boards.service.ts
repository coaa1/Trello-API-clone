import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardsRepository } from './boards.repository';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardsRepository)
    private boardsRepository: BoardsRepository,
  ) {}

  create(createBoardDto: CreateBoardDto) {
    return this.boardsRepository.createBoard(createBoardDto);
  }

  findAll() {
    return this.boardsRepository.getAll();
  }

  findOne(id: string) {
    return this.boardsRepository.getOne(id);
  }

  update(id: string, updateBoardDto: UpdateBoardDto) {
    return this.boardsRepository.updateOne(id, updateBoardDto);
  }

  remove(id: string) {
    return this.boardsRepository.removeOne(id);
  }
}
