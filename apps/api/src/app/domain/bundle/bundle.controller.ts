import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { BundleService } from './bundle.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateBundleDto } from './dto/createBundle.dto';
import { Bundle } from './bundle.schema';
import { Review } from '../review/review.schema';
import { CreateReviewDto } from '../review/dto/createReview.dto';
import { UpdateReviewDto } from '../review/dto/updateReview.dto';

@Controller('bundle')
export class BundleController {
  constructor(
    private readonly bundleService: BundleService,
    private readonly userService: UserService
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a bundle' })
  @Post()
  async create(@Body() supplementDto: CreateBundleDto): Promise<Bundle> {
    return this.bundleService.create(supplementDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'edit a bundle' })
  @Put(':id')
  async edit(@Param('id') params, bundleDto: CreateBundleDto): Promise<Bundle> {
    return this.bundleService.update(params.id, bundleDto);
  }

  @ApiOperation({ summary: 'get recommended bundles' })
  @Get(':id/recommendations')
  async recommendations(@Param() params): Promise<any> {
    return this.bundleService.findRecommendations(params.id);
  }

  @ApiOperation({ summary: 'get all bundles in the database' })
  @Get()
  async findAll(): Promise<Bundle[]> {
    return this.bundleService.findAll();
  }

  @ApiOperation({ summary: 'get a single bundle' })
  @Get(':id')
  async findOne(@Param() params): Promise<Bundle> {
    return this.bundleService.findOne(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'remove a bundle' })
  @Delete(':id')
  async remove(@Param() params): Promise<Bundle> {
    return this.bundleService.remove(params.id);
  }

  @ApiOperation({ summary: 'get the reviews for a bundle' })
  @Get(':id/reviews')
  async getReviews(@Param() params): Promise<Review[]> {
    return this.bundleService.findReviewsById(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'add a review for a bundle' })
  @Post(':id/reviews')
  async addReview(
    @Param() params,
    @Body() reviewDto: CreateReviewDto
  ): Promise<Review> {
    return this.bundleService.createReview(params.id, reviewDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'edit a owned review' })
  @Put(':id/reviews/:reviewId')
  async editReview(
    @Param() params,
    @Body() reviewDto: UpdateReviewDto
  ): Promise<Review> {
    return this.bundleService.updateReview(
      params.id,
      params.reviewId,
      reviewDto
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'delete a owned review' })
  @Delete(':id/reviews/:reviewId')
  async deleteReview(@Param() params): Promise<Review> {
    return this.bundleService.deleteReview(params.id, params.reviewId);
  }
}