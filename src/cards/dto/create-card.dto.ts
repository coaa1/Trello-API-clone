import { IsString } from 'class-validator';

export class CreateCardDto {
  @IsString()
  name: string;

  desc: string;

  @IsString()
  idList: string;
}
