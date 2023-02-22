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
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { ListAllEntities } from './dto/listAllEntities.dto';


@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll(@Query() query: ListAllEntities): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param() params): Promise<Order> {
    return this.orderService.findOne(params.id);
  }

  @Post()
  create(@Body() orderDto: OrderDto): Promise<Order> {
    return this.orderService.create(orderDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() orderDto: OrderDto) {
    return this.orderService.update(id, orderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
