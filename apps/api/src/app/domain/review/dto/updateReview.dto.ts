import { ApiProperty } from '@nestjs/swagger';

export class UpdateReviewDto {
  @ApiProperty()
  rating: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  title: string;
}