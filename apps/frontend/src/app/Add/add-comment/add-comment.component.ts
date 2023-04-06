import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '../../Models/review.model';
import { ReviewService } from '../../Models/review.service';
import { Supplement } from '../../Models/supplement.model';
import { SupplementService } from '../../Models/supplement.service';

@Component({
  selector: 'gym-bulk-shop-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css'],
})
export class AddCommentComponent implements OnInit {
  supplement: Supplement | undefined;
  review: Review | undefined;
  constructor(
    private supplementService: SupplementService,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.review = {
      _id: '',
      title: '',
      supplementId: '',
      rating: 0,
      text: '',
      userId: '',
    };

    this.supplement = this.supplementService.getSupplement(
      this.route.snapshot.params['id']
    );
  }

  postReview() {
    this.review!.supplementId = this.supplement?._id!;
    this.review!.userId = '1';
    this.reviewService.addReview(this.review!);
    this.router.navigate(['/supplements/' + this.supplement?._id]);
  }
}
