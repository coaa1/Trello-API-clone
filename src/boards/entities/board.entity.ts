import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { List } from '../../lists/entities/list.entity';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  description: string;

  @OneToMany(() => List, (list) => list.board, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  lists: List[];
}
