import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
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
  async create(
    @Request() req: any,
    @Body() supplementDto: CreateBundleDto
  ): Promise<Bundle> {
    const userId = req.user.id;
    return this.bundleService.create(supplementDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'edit a bundle' })
  @Put(':id')
  async edit(
    @Request() req: any,
    @Param('id') params,
    bundleDto: CreateBundleDto
  ): Promise<Bundle> {
    const userId = req.user.id;
    return this.bundleService.update(params.id, bundleDto, userId);
  }

  @ApiOperation({ summary: 'get recommended bundles' })
  @Get(':id/recommendations')
  async recommendations(@Param() params): Promise<Bundle[]> {
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
  async remove(@Request() req: any, @Param() params): Promise<Bundle> {
    const userId = req.user.id;
    return this.bundleService.remove(params.id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'add a product to a bundle' })
  @Post(':id/products/:productId')
  async addProduct(@Request() req: any, @Param() params): Promise<Bundle> {
    const userId = req.user.id;
    return this.bundleService.addProduct(params.id, params.productId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'remove a product from a bundle' })
  @Delete(':id/products/:productId')
  async removeProduct(@Request() req: any, @Param() params): Promise<Bundle> {
    const userId = req.user.id;
    return this.bundleService.removeProduct(
      params.id,
      params.productId,
      userId
    );
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
    @Request() req: any,
    @Param() params,
    @Body() reviewDto: CreateReviewDto
  ): Promise<Review> {
    const userId = req.user.id;
    return this.bundleService.createReview(params.id, reviewDto, userId);
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
    return this.bundleService.updateReview(
      params.id,
      params.reviewId,
      reviewDto,
      userId
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'delete a owned review' })
  @Delete(':id/reviews/:reviewId')
  async deleteReview(@Request() req: any, @Param() params): Promise<Review> {
    const userId = req.user.id;
    return this.bundleService.deleteReview(params.id, params.reviewId, userId);
  }
}