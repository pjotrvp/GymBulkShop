import { ApiProperty } from '@nestjs/swagger';

export class CreateBundleDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  price: number;
}
