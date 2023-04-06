import { ApiProperty } from '@nestjs/swagger';


export class OrderDto {
  @ApiProperty()
  user: string;
  @ApiProperty()
  kits: string[];
  @ApiProperty()
  supplements: string[];
}
