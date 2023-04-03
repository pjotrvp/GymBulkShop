import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Supplement } from './supplement.schema';
import { CreateSupplementDto } from './dto/createSupplement.dto';
import { UpdateSupplementDto } from './dto/updateSupplement.dto';
import { SupplementService } from './supplement.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserService } from '../user/user.service';
@Controller('supplement')
export class SupplementController {
  constructor(
    private readonly supplementService: SupplementService,
    private readonly userService: UserService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() supplementDto: CreateSupplementDto
  ): Promise<Supplement> {
    return this.supplementService.create(supplementDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async edit(
    @Param('id') params,
    supplementDto: UpdateSupplementDto
  ): Promise<Supplement> {
    if (
      (await this.userService.getCurrentId()) !==
      (await this.supplementService.findOne(params.id)).createdById
    ) {
      throw new HttpException(
        'Can only edit owned supplements',
        HttpStatus.FORBIDDEN
      );
    }
    return this.supplementService.update(params.id, supplementDto);
  }

  @Get(':id/recommendations')
  async recommendations(@Param() params): Promise<any> {
    return this.supplementService.findRecommendations(params.id);
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
    if (
      (await this.userService.getCurrentId()) !==
      (await this.supplementService.findOne(params.id)).createdById
    ) {
      throw new HttpException(
        'Can only delete owned supplements',
        HttpStatus.FORBIDDEN
      );
    }
    return this.supplementService.remove(params.id);
  }
}
