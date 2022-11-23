import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('product')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all products';
  }

  @Get(':id')
  findOne(@Param('id') id): string {
    return `This action returns a #${id} product`;
  }

//   @Put(':id')
//   update(@Param('id') id, @Body() updateProductDto: UpdateProductDto) {
//     return `This action updates a #${id} product`;
//   }

//   @Post()
//   @HttpCode(204)
//   create(@Body() createProductDto: CreateProductDto) {
//     return 'This action adds a new product';
//   }

  @Delete(':id')
  remove(@Param('id') id) {
    return `This action removes a #${id} product`;
  }
}
