import { EntityRepository, Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { List } from '../lists/entities/list.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { Board } from '../boards/entities/board.entity';
import { NotFoundException } from '@nestjs/common';
import { boardsErrors } from '../boards/boards.errors';
import { UpdateCardDto } from './dto/update-card.dto';
import { cardsErrors } from './cards.errors';
import { listsErrors } from '../lists/lists.errors';

@EntityRepository(Card)
export class CardsRepository extends Repository<Card> {
  async createCard(list: List, createCardDto: CreateCardDto) {
    const { name, desc } = createCardDto;
    const newCard = new Card();
    newCard.name = name;
    newCard.desc = desc;
    newCard.list = list;
    return await newCard.save();
  }

  public async getOne(id: string): Promise<Card> {
    const result = await this.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException();
    } else {
      return result;
    }
  }

  public async updateOne(
    id: string,
    updateCardDto: UpdateCardDto,
    list: List,
  ): Promise<Card> {
    const card = await this.findOne({ where: { id } });
    if (!card) {
      throw new NotFoundException(cardsErrors.NOT_FOUND);
    }
    if (updateCardDto.name) {
      card.name = updateCardDto.name;
    }
    if (updateCardDto.desc) {
      card.desc = updateCardDto.desc;
    }
    if (list) {
      card.list = list;
    }
    return await card.save();
  }

  public async removeOne(id: string): Promise<void> {
    const exists = await this.findOne({ where: { id } });
    if (!exists) {
      throw new NotFoundException(cardsErrors.NOT_FOUND);
    }
    await this.delete({ id });
  }
}
