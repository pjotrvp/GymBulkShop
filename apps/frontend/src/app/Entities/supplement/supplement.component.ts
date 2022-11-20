import { Component, OnInit } from '@angular/core';
import { Supplement } from '../../Models/supplement.model';
import { SupplementService } from '../../Models/supplement.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'gym-bulk-shop-supplement',
  templateUrl: './supplement.component.html',
  styleUrls: ['./supplement.component.css'],
})
export class SupplementComponent implements OnInit {
  constructor(private supplementService : SupplementService,
    private route : ActivatedRoute) {}
  supplement: Supplement | undefined;
  ngOnInit(): void {
    this.supplement = this.supplementService.getSupplement(this.route.snapshot.params['id']);
    console.log('supplement:')
    console.log(Supplement);
  }
  deleteSupplement() {
    this.supplementService.deleteSupplement(this.supplement!._id!);
  }
}
