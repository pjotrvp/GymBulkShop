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
    @Body() supplementDto: CreateSupplementDto
  ): Promise<Supplement> {
    return this.supplementService.create(supplementDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'edit a supplement' })
  @Put(':id')
  async edit(
    @Param() params,
    @Body() supplementDto: UpdateSupplementDto
  ): Promise<Supplement> {
    return this.supplementService.update(params.id, supplementDto);
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
  async remove(@Param() params): Promise<Supplement> {
    return this.supplementService.remove(params.id);
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
    @Param() params,
    @Body() reviewDto: CreateReviewDto
  ): Promise<Review> {
    return this.supplementService.addReview(params.id, reviewDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'edit a owned review' })
  @Put(':id/reviews/:reviewId')
  async editReview(
    @Param() params,
    @Body() reviewDto: UpdateReviewDto
  ): Promise<Review> {
    return this.supplementService.editReview(
      params.id,
      params.reviewId,
      reviewDto
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'delete a owned review' })
  @Delete(':id/reviews/:reviewId')
  async deleteReview(@Param() params): Promise<Review> {
    return this.supplementService.deleteReview(params.id, params.reviewId);
  }
}
