import { Component, OnInit } from '@angular/core';
import { Supplement, SupplementType } from '../../Models/supplement.model';
import { SupplementService } from '../../Models/supplement.service';
import { User } from '../../Models/user.model';
import { Subscription } from 'rxjs';
import { UserService } from '../../Models/user.service';
import { AuthService } from '../../authentication/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'gym-bulk-shop-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  supplement: Supplement | undefined;
  ingredients: any[] = [];
  flavours: any[] = [];
  user: User | undefined;
  subscription!: Subscription;

  constructor(
    private supplementService: SupplementService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.ingredients.push(0);
    this.flavours.push(0);
    this.supplement = {
      _id: '',
      name: '',
      description: '',
      price: 0,
      image: '',
      supplementType: SupplementType.Other,
      containsLactose: false,
      isVegan: false,
      flavours: [],
      sizes: [],
      reviews: [],
      ingredients: [],
    };
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

  addSupplement() {
    this.supplement;
    if (this.supplement) {
      this.supplement.ingredients = this.ingredients;
      this.supplement.flavours = this.flavours;
      this.supplement.name = this.supplement.name.trimEnd();
      this.supplementService.create(this.supplement).subscribe({
        next: (supplement) => {
          this.supplement = supplement;
          this.router.navigate(['/supplements/' + supplement._id]);
        },
        error: (err) => {
          console.log(
            'Error in AddProductComponent with creating supplement: ' + err
          );
        },
      });
    }
  }
}
