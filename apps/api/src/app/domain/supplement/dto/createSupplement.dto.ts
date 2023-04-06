import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateSupplementDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  supplementType: string;
  @ApiProperty()
  containsLactose: boolean;
  @ApiProperty()
  isVegan: boolean;
  @ApiProperty()
  price: number;
  @ApiProperty()
  flavours: string[];
  @ApiProperty()
  sizes: string[];
  @ApiProperty()
  ingredients: string[];
}
