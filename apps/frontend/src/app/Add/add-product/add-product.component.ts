import { Component, OnInit } from '@angular/core';
import { Supplement, SupplementType } from '../../Models/supplement.model';
import { SupplementService } from '../../Models/supplement.service';

@Component({
  selector: 'gym-bulk-shop-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  constructor(private supplementService: SupplementService) {}
  supplement: Supplement | undefined;
  ings: number[] = [];
  flavours: number[] = [];
  ngOnInit(): void {
    this.ings.push(0);
    this.flavours.push(0);
    this.supplement = {
      _id: '',
      name: '',
      price: 0,
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
    if (this.ings.length == 10) {
      alert("You can't add more than 10 ingredients");
    }
    if (this.ings.length < 10) {
      this.ings.push(0);
    }
  }

  removeIngredient() {
    if (this.ings.length > 1) {
      this.ings.pop();
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
    this.supplementService.addSupplement(this.supplement!);
  }
}
