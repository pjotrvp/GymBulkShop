import { Component, OnInit } from '@angular/core';
import { Supplement } from '../../Models/supplement.model';
import { SupplementService } from '../../Models/supplement.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  supplements : Supplement[] = []
    
  constructor(private supplementService : SupplementService) {
    
   }

  ngOnInit(): void {
    this.supplements = this.supplementService.getSupplements();
    console.log('ProductListComponent geladen');
  }

}