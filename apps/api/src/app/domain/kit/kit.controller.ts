import { Kit } from './kit.schema';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { KitService } from './kit.service';
import { KitDto } from './dto/kit.dto';
import { ListAllEntities } from './dto/listAllEntities.dto';

@Controller('kit')
export class KitController {
  constructor(private readonly kitService: KitService) {}

  @Get()
  findAll(@Query() query: ListAllEntities): Promise<Kit[]> {
    return this.kitService.findAll();
  }

  @Get(':id')
  findOne(@Param() params): Promise<Kit> {
    return this.kitService.findOne(params.id);
  }

  @Post()
  create(@Body() kitDto: KitDto): Promise<Kit> {
    return this.kitService.create(kitDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() kitDto: KitDto) {
    return this.kitService.update(id, kitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kitService.remove(id);
  }
}
