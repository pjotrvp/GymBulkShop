import { User } from './user.schema';
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
  UseGuards, Request
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { ListAllEntities} from './dto/listAllEntities.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { OrderService } from '../order/order.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Order } from '../order/order.schema';
import { OrderDto } from '../order/dto/order.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly orderService: OrderService
  ) {}

  @Get()
  findAll(@Query() query: ListAllEntities): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':email')
  findByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findOneByEmail(email);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/order')
  findAllOrders(@Query() query: ListAllEntities): Promise<Order[]> {
    return this.userService.findAllOrder();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/order/:id')
  findOneOrder(@Param() params): Promise<Order> {
    return this.userService.findOneOrder(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/order')
  createOrder(@Body() orderDto: OrderDto): Promise<Order> {
    return this.userService.createOrder(orderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/order/:id')
  updateOrder(
    @Request() req: any,
    @Param('id') id: string,
    @Body() orderDto: OrderDto
  ) {
    const userId = req.user.id;
    return this.userService.updateOrder(id, orderDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/order/:id')
  removeOrder(@Request() req: any, @Param('id') id: string) {
    const userId = req.user.id;
    return this.userService.removeOrder(id, userId);
  }
}
