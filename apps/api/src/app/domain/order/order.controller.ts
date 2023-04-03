import { Order } from './order.schema';
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
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { ListAllEntities } from './dto/listAllEntities.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';


@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: ListAllEntities): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param() params): Promise<Order> {
    return this.orderService.findOne(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() orderDto: OrderDto): Promise<Order> {
    return this.orderService.create(orderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() orderDto: OrderDto) {
    return this.orderService.update(id, orderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
