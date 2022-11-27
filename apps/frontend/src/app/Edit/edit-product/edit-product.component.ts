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
  constructor(
    private supplementService: SupplementService,
    private route: ActivatedRoute
  ) {}
  supplement: Supplement | undefined;
  ngOnInit(): void {
    this.supplement = this.supplementService.getSupplement(
      this.route.snapshot.params['id']
    );
    console.log('edit-product-component supplement: ', this.supplement);
    
  }
  editSupplement() {
    this.supplementService.updateSupplement(this.supplement!);
  }
}
