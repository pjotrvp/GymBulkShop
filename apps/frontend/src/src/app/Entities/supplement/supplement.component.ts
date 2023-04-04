import { Component, OnInit } from '@angular/core';
import { Supplement } from '../../Models/supplement.model';
import { SupplementService } from '../../Models/supplement.service';
import { Review } from '../../Models/review.model';
import { ReviewService } from '../../Models/review.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'gym-bulk-shop-supplement',
  templateUrl: './supplement.component.html',
  styleUrls: ['./supplement.component.css'],
})
export class SupplementComponent implements OnInit {
  
  constructor(
    private supplementService: SupplementService,
    private route: ActivatedRoute,
    private reviewService: ReviewService
  ) {}
  reviews: Review[] = [];
  supplement: Supplement | undefined;
  ngOnInit(): void {
    this.supplement = this.supplementService.getSupplement(
      this.route.snapshot.params['id']
    );
    this.reviews = this.reviewService.getReviewsBySupplementId(
      this.route.snapshot.params['id']
    );

    console.log(this.reviews);
    console.log('supplementcomponent: ', this.supplement);
  }
  deleteSupplement() {
    this.supplementService.deleteSupplement(this.supplement!._id!);
  }
}
