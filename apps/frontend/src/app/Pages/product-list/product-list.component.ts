import { Component, OnInit } from '@angular/core';
import { Supplement } from '../../Models/supplement.model';
import { SupplementService } from '../../Models/supplement.service';
import { KitService } from '../../Models/kit.service';
import { Kit } from '../../Models/kit.model';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  kits : Kit[] = []
  supplements : Supplement[] = []
    
  constructor(private supplementService : SupplementService, 
              private kitService : KitService) {
    
   }

  ngOnInit(): void {
    this.kits = this.kitService.getKits();
    this.supplements = this.supplementService.getSupplements();
    console.log('ProductListComponent geladen');
  }

}