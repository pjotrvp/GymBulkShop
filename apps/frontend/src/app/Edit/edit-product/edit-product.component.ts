import { Component, OnInit } from '@angular/core';
import { Supplement } from '../../Models/supplement.model';
import { SupplementService } from '../../Models/supplement.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'gym-bulk-shop-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  ings: any[] = [];
  flavours: any[] = [];
  constructor(
    private supplementService: SupplementService,
    private route: ActivatedRoute
  ) {}
  supplement: Supplement | undefined;
  ngOnInit(): void {
    this.supplement = this.supplementService.getSupplement(
      this.route.snapshot.params['id']
    );
    for (let i = 0; i < this.supplement!.ingredients.length; i++) {
      this.ings.push(0);
    }
    for (let i = 0; i < this.supplement!.flavours.length; i++) {
      this.flavours.push(0);
    }
    console.log('edit-product-component supplement: ', this.supplement);
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

  editSupplement() {
    this.supplementService.updateSupplement(this.supplement!);
  }
}
