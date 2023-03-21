import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Supplement } from './supplement.schema';
import { CreateSupplementDto } from './dto/createSupplement.dto';
import { UpdateSupplementDto } from './dto/updateSupplement.dto';
import { SupplementService } from './supplement.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
@Controller('supplement')
export class SupplementController {
  constructor(private readonly supplementService: SupplementService) {}

  @Post()
  async create(@Body() supplementDto: CreateSupplementDto): Promise<Supplement> {
    return this.supplementService.create(supplementDto);
  }

  @Put(':id')
  async edit(@Param('id') id: string, supplementDto: UpdateSupplementDto): Promise<Supplement> {
    return this.supplementService.edit(id, supplementDto);
  }

  @Get()
  async findAll(): Promise<Supplement[]> {
    return this.supplementService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params): Promise<Supplement> {
    return this.supplementService.findOne(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param() params): Promise<Supplement> {
    return this.supplementService.remove(params.id);
  }

}


