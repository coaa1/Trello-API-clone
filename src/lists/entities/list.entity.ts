import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from '../../boards/entities/board.entity';
import { Card } from '../../cards/entities/card.entity';

@Entity()
export class List extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: '' })
  name: string;

  @ManyToOne(() => Board, (board) => board.lists, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  board: Board;

  @OneToMany(() => Card, (card) => card.list, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  cards: Card[];
}
