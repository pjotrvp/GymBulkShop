import { ApiProperty } from '@nestjs/swagger';

export class UpdateSupplementDto {
  @ApiProperty()
  name?: string;
  @ApiProperty()
  supplementType?: string;
  @ApiProperty()
  containsLactose?: boolean;
  @ApiProperty()
  isVegan?: boolean;
  @ApiProperty()
  price?: number;
  @ApiProperty()
  flavours?: string[];
  @ApiProperty()
  sizes?: string[];
  @ApiProperty()
  ingredients?: string[];
}
