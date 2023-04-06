/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core';
import { Supplement } from '../../Models/supplement.model';
import { SupplementService } from '../../Models/supplement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { User } from '../../Models/user.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../authentication/Services/auth.service';

@Component({
  selector: 'gym-bulk-shop-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  supplement: Supplement | undefined;
  supplementId: string = this.route.snapshot.params['id'];
  user: User | undefined;
  subscription!: Subscription;
  ingredients: any[] = [];
  flavours: any[] = [];

  constructor(
    private supplementService: SupplementService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    console.log('EditProductComponent constructor');
  }

  ngOnInit() {
    this.subscription = this.supplementService
      .read(this.supplementId)
      .subscribe({
        next: (supplement) => {
          this.supplement = supplement;
          this.ingredients = this.supplement.ingredients;
          this.flavours = this.supplement.flavours;
        },
        error: (err) => {
          console.log(
            'Error in EditProductComponent with retrieving supplement: ' + err
          );
        },
      });

    console.log('edit-product-component supplement: ', this.supplement);
  }

  addIngredient() {
    if (this.ingredients.length == 10) {
      alert("You can't add more than 10 ingredients");
    }
    if (this.ingredients.length < 10) {
      this.ingredients.push(0);
    }
  }

  removeIngredient() {
    if (this.ingredients.length > 1) {
      this.ingredients.pop();
    }
  }

  addFlavour() {
    if (this.flavours.length == 10) {
      alert("You can't add more than 10 flavours");
    }
    if (this.flavours.length < 10) {
      this.flavours.push(0);
    }
  }

  removeFlavour() {
    if (this.flavours.length > 1) {
      this.flavours.pop();
    }
  }

  editSupplement() {
    this.subscription = this.supplementService
      .update(this.supplement!)
      .subscribe({
        next: (supplement) => {
          this.supplement = { ...supplement };
          this.router.navigate(['/supplements/' + this.supplementId]);
        },
      });
  }
}
