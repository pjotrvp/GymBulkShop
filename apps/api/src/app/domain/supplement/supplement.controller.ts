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
  Request,
} from '@nestjs/common';
import { Supplement } from './supplement.schema';
import { CreateSupplementDto } from './dto/createSupplement.dto';
import { UpdateSupplementDto } from './dto/updateSupplement.dto';
import { SupplementService } from './supplement.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { Review } from '../review/review.schema';
import { CreateReviewDto } from '../review/dto/createReview.dto';
import { UpdateReviewDto } from '../review/dto/updateReview.dto';
import { ApiOperation } from '@nestjs/swagger';
@Controller('supplement')
export class SupplementController {
  constructor(
    private readonly supplementService: SupplementService,
    private readonly userService: UserService
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a supplement' })
  @Post()
  async create(
    @Request() req: any,
    @Body() supplementDto: CreateSupplementDto
  ): Promise<Supplement> {
    const userId = req.user.id;
    return this.supplementService.create(supplementDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'edit a supplement' })
  @Put(':id')
  async edit(
    @Request() req: any,
    @Param() params,
    @Body() supplementDto: UpdateSupplementDto
  ): Promise<Supplement> {
    const userId = req.user.id;
    return this.supplementService.update(params.id, supplementDto, userId);
  }

  @ApiOperation({ summary: 'get recommended supplements' })
  @Get(':id/recommendations')
  async recommendations(@Param() params): Promise<any> {
    return this.supplementService.findRecommendations(params.id);
  }

  @ApiOperation({ summary: 'get all supplements in the database' })
  @Get()
  async findAll(): Promise<Supplement[]> {
    return this.supplementService.findAll();
  }

  @ApiOperation({ summary: 'get a single supplement' })
  @Get(':id')
  async findOne(@Param() params): Promise<Supplement> {
    return this.supplementService.findOne(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'remove a supplement' })
  @Delete(':id')
  async remove(@Request() req: any, @Param() params): Promise<Supplement> {
    const userId = req.user.id;
    return this.supplementService.remove(params.id, userId);
  }

  @ApiOperation({ summary: 'get the reviews for a supplement' })
  @Get(':id/reviews')
  async getReviews(@Param() params): Promise<Review[]> {
    return this.supplementService.findReviewsById(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'add a review for a supplement' })
  @Post(':id/reviews')
  async addReview(
    @Request() req: any,
    @Param() params,
    @Body() reviewDto: CreateReviewDto
  ): Promise<Review> {
    const userId = req.user.id;
    return this.supplementService.addReview(params.id, reviewDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'edit a owned review' })
  @Put(':id/reviews/:reviewId')
  async editReview(
    @Request() req: any,
    @Param() params,
    @Body() reviewDto: UpdateReviewDto
  ): Promise<Review> {
    const userId = req.user.id;
    return this.supplementService.editReview(
      params.id,
      params.reviewId,
      reviewDto, userId
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'delete a owned review' })
  @Delete(':id/reviews/:reviewId')
  async deleteReview(@Request() req: any, @Param() params): Promise<Review> {
    const userId = req.user.id;
    return this.supplementService.deleteReview(params.id, params.reviewId, userId);
  }
}
