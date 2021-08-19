import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  idCard: string;

  @IsNotEmpty()
  text: string;
}
