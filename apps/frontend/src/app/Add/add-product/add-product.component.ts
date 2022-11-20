import { Component, OnInit } from '@angular/core';
import { Supplement , SupplementType} from '../../Models/supplement.model';
import { SupplementService } from '../../Models/supplement.service';

@Component({
  selector: 'gym-bulk-shop-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  constructor(private supplementService: SupplementService) {}
  supplement: Supplement | undefined;
  ngOnInit(): void {
    this.supplement = {
      _id: '',
      name: '',
      price: 0,
      supplementType: SupplementType.Other,
      containsLactose: false,
      isVegan: false,
    };
  }
  
  addSupplement() {
      this.supplementService.addSupplement(this.supplement!);
  }
}
