import { Injectable } from '@angular/core';
import { Review } from './review.model';

@Injectable({
    providedIn : 'root',
})
export class ReviewService {
    reviews : Review[] = [
        {
            _id : '1',
            title : 'Best protein ever!',
            text : 'I love this protein, it tastes great and it works!',
            rating : 5,
            supplementId : '3',
            userId : '1',
        },
        {
            _id : '2',
            title : 'Worst protein ever!',
            text : 'I hate this protein, it tastes bad and it doesnt work!',
            rating : 4,
            supplementId : '3',
            userId : '2',
        },
        {
            _id : '3',
            title : 'Best fish oil ever!',
            text : 'I love this fish oil, it tastes great and it works!',
            rating : 5,
            supplementId : '2',
            userId : '1',
        },
        {
            _id : '4',
            title : 'Worst fish oil ever!',
            text : 'I hate this fish oil, it tastes bad and it doesnt work!',
            rating : 1,
            supplementId : '2',
            userId : '2',
        },
        {
            _id : '5',
            title : 'Best vitamin ever!',
            text : 'I love this vitamin, it tastes great and it works!',
            rating : 5,
            supplementId : '1',
            userId : '1',
        },
        {
            _id : '6',
            title : 'Worst vitamin ever!',
            text : 'I hate this vitamin, it tastes bad and it doesnt work!',
            rating : 1,
            supplementId : '1',
            userId : '2',
        },
        {
            _id : '7',
            title : 'Best creatine ever!',
            text : 'I love this creatine, it tastes great and it works!',
            rating : 5,
            supplementId : '4',
            userId : '1',
        },
        {
            _id : '8',
            title : 'Worst creatine ever!',
            text : 'I hate this creatine, it tastes bad and it doesnt work!',
            rating : 1,
            supplementId : '4',
            userId : '2',
        },
    ];

    getReviews(): Review[] {
        return this.reviews;
    }

    getReview(id: string): Review {
        return this.reviews.find((review) => review._id === id)!;
    }

    getReviewsBySupplementId(id: string): Review[] {
        return this.reviews.filter((review) => review.supplementId === id);
    }
    
    getReviewIdBySupplementId(supplementId: string) {
        return this.reviews.find((review) => review.supplementId === supplementId)!._id;
    }

    addReview(review: Review) {
        review._id = String(this.reviews.length + 1);
        this.reviews.push(review);
    }

    deleteReview(id: string) {
        this.reviews = this.reviews.filter((review) => review._id !== id);
    }

    updateReview(review: Review) {
        this.reviews = this.reviews.map((r) =>
            r._id === review._id ? review : r
        );
    }

            
}