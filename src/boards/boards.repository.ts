import { EntityRepository, Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { NotFoundException } from '@nestjs/common';
import { boardsErrors } from './boards.errors';

@EntityRepository(Board)
export class BoardsRepository extends Repository<Board> {
  public async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { name, description } = createBoardDto;
    const newBoard = new Board();
    newBoard.name = name;
    newBoard.description = description;
    return newBoard.save();
  }

  public async getOne(id: string): Promise<Board> {
    const qb = await this.createQueryBuilder('board')
      .leftJoinAndSelect('board.lists', 'list')
      .leftJoinAndSelect('list.cards', 'card')
      .leftJoinAndSelect('card.comments', 'comments')
      .where('board.id=:id', { id })
      .getOne();
    if (!qb) {
      throw new NotFoundException(boardsErrors.NOT_FOUND);
    } else {
      return qb;
    }
  }

  public async getAll(): Promise<Board[]> {
    return this.find();
  }

  public async updateOne(
    id: string,
    updateBoardDto: Partial<UpdateBoardDto>,
  ): Promise<Board> {
    const exists = await this.findOne({ where: { id } });
    if (!exists) {
      throw new NotFoundException(boardsErrors.NOT_FOUND);
    }
    await this.update({ id }, updateBoardDto);
    return this.findOne({ id });
  }

  public async removeOne(id: string): Promise<void> {
    const exists = await this.findOne({ where: { id } });
    if (!exists) {
      throw new NotFoundException(boardsErrors.NOT_FOUND);
    }
    await this.delete({ id });
  }
}
