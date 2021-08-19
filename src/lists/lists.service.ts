import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ListsRepository } from './lists.repository';
import { BoardsService } from '../boards/boards.service';
import { boardsErrors } from '../boards/boards.errors';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(ListsRepository) private listsRepository: ListsRepository,
    @Inject(BoardsService) private boardsService: BoardsService,
  ) {}

  async create(createListDto: CreateListDto) {
    const board = await this.boardsService.findOne(createListDto.idBoard);
    if (!board) {
      throw new NotFoundException(boardsErrors.NOT_FOUND);
    }
    return this.listsRepository.createList(createListDto, board);
  }

  findAll() {
    return this.listsRepository.getAll();
  }

  findOne(id: string) {
    return this.listsRepository.getOne(id);
  }

  async update(id: string, updateListDto: UpdateListDto) {
    let board = null;
    if (updateListDto.idBoard) {
      board = await this.boardsService.findOne(updateListDto.idBoard);
      if (!board) {
        throw new NotFoundException(boardsErrors.NOT_FOUND);
      }
    }
    return this.listsRepository.updateOne(id, updateListDto, board);
  }

  remove(id: string) {
    return this.listsRepository.removeOne(id);
  }
}
