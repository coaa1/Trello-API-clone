import { EntityRepository, Repository } from 'typeorm';
import { List } from './entities/list.entity';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { Board } from '../boards/entities/board.entity';
import { NotFoundException } from '@nestjs/common';
import { listsErrors } from './lists.errors';

@EntityRepository(List)
export class ListsRepository extends Repository<List> {
  public async createList(
    createListDto: CreateListDto,
    board: Board,
  ): Promise<List> {
    const { name } = createListDto;
    const newList = new List();
    newList.name = name;
    newList.board = board;
    return await newList.save();
  }

  public async getOne(id: string): Promise<List> {
    const result = await this.findOne({
      where: { id },
      relations: ['cards', 'cards.comments'],
    });
    if (!result) {
      throw new NotFoundException(listsErrors.NOT_FOUND);
    }
    return result;
  }

  public async getAll(): Promise<List[]> {
    return this.find({ relations: ['cards', 'cards.comments'] });
  }

  public async updateOne(
    id: string,
    updateListDto: Partial<UpdateListDto>,
    board: Board,
  ): Promise<List> {
    const list = await this.findOne({ where: { id } });
    if (!list) {
      throw new NotFoundException(listsErrors.NOT_FOUND);
    }
    if (updateListDto.name) {
      list.name = updateListDto.name;
    }
    if (board) {
      list.board = board;
    }
    return await list.save();
  }

  public async removeOne(id: string): Promise<void> {
    const exists = await this.findOne({ where: { id } });
    if (!exists) {
      throw new NotFoundException(listsErrors.NOT_FOUND);
    }
    await this.delete({ id });
  }
}
