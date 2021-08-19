import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { List } from '../../lists/entities/list.entity';
import { Comment } from '../../comments/entities/comment.entity';

@Entity()
export class Card extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  desc: string;

  @ManyToOne(() => List, (list) => list.cards, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  list: List;

  @OneToMany(() => Comment, (comment) => comment.card, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  comments: Comment[];
}
