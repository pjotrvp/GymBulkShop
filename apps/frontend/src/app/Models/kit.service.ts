import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kit, KitType } from './kit.model';

@Injectable({
  providedIn: 'root',
})
export class KitService {
  kits: Kit[] = [
    {
      _id: '1',
      name: 'Deadlift barbell',
      kitType: KitType.FreeWeight,
      resistance: 20,
      price: 400,
      reviews: [],
    },
    {
      _id: '2',
      name: 'Leg Press',
      kitType: KitType.Machine,
      resistance: 400,
      price: 1000,
      reviews: [],
    },
    {
      _id: '3',
      name: 'Shaker',
      kitType: KitType.Accessory,
      resistance: 0,
      price: 10,
      reviews: [],
    },
    {
      _id: '4',
      name: 'Squat Rack',
      kitType: KitType.Other,
      resistance: 0,
      price: 1000,
      reviews: [],
    },
    {
      _id: '5',
      name: 'deadlift slippers',
      kitType: KitType.Shoes,
      resistance: 0,
      price: 100,
      reviews: [],
    },
    {
      _id: '6',
      name: 'T-shirt',
      kitType: KitType.Merch,
      resistance: 0,
      price: 20,
      reviews: [],
    },
  ];

  getKits(): Kit[] {
    return this.kits;
  }

  getKit(id: string) {
    return this.kits.find((kit) => kit._id === id);
  }

  addKit(kit: Kit) {
    this.kits.push(kit);
  }

  updateKit(kit: Kit) {
    const index = this.kits.findIndex((p) => p._id === kit._id);
    this.kits[index] = kit;
  }

  deleteKit(id: string) {
    const index = this.kits.findIndex((p) => p._id === id);
    this.kits.splice(index, 1);
  }
}
