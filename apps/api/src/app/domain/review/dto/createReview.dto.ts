import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty()
  rating: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  title: string;
}
