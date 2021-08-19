import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CardsRepository } from './cards.repository';
import { ListsService } from '../lists/lists.service';
import { listsErrors } from '../lists/lists.errors';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardsRepository) private cardsRepository: CardsRepository,
    @Inject(ListsService) private listsService: ListsService,
  ) {}

  async create(createCardDto: CreateCardDto) {
    const list = await this.listsService.findOne(createCardDto.idList);
    if (!list) {
      return new NotFoundException(listsErrors.NOT_FOUND);
    }
    return this.cardsRepository.createCard(list, createCardDto);
  }

  findOne(id: string) {
    return this.cardsRepository.getOne(id);
  }

  async update(id: string, updateCardDto: UpdateCardDto) {
    let list = null;
    if (updateCardDto.idList) {
      list = await this.listsService.findOne(updateCardDto.idList);
      if (!list) {
        throw new NotFoundException(listsErrors.NOT_FOUND);
      }
    }
    return this.cardsRepository.updateOne(id, updateCardDto, list);
  }

  remove(id: string) {
    return this.cardsRepository.removeOne(id);
  }
}
