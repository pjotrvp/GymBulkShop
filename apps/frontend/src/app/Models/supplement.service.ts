import { Injectable } from '@angular/core';
import { Supplement, SupplementType } from './supplement.model';
@Injectable({
  providedIn: 'root',
})
export class SupplementService {
  constructor() {}

  supplements: Supplement[] = [
    {
      _id: '1',
      name: 'Vitamin Deez Nuts',
      supplementType: SupplementType.Vitamin,
      containsLactose: false,
      isVegan: true,
      price: 10,
    },
    {
      _id: '2',
      name: 'Fish Oil OmegaLulz',
      supplementType: SupplementType.FishOil,
      containsLactose: false,
      isVegan: false,
      price: 20,
    },
    {
      _id: '3',
      name: 'Gold standard whey Protein',
      supplementType: SupplementType.Protein,
      containsLactose: false,
      isVegan: false,
      price: 30,
    },
    {
      _id: '4',
      name: 'Micronized Creatine',
      supplementType: SupplementType.Creatine,
      containsLactose: false,
      isVegan: false,
      price: 40,
    },
    {
      _id: '5',
      name: 'Red bull energy drink',
      supplementType: SupplementType.Other,
      containsLactose: false,
      isVegan: false,
      price: 50,
    },
    {
      _id: '6',
      name: 'DMAA insane crazy kill it PreWorkout',
      supplementType: SupplementType.PreWorkout,
      containsLactose: false,
      isVegan: false,
      price: 60,
    },
  ];

  getSupplements(): Supplement[] {
    return this.supplements;
  }

  getSupplement(id: string) {
    return this.supplements.find((supplement) => supplement._id === id);
  }

  updateSupplement(supplement: Supplement) {
    const index = this.supplements.findIndex((s) => s._id === supplement._id);
    this.supplements[index] = supplement;
  }

  deleteSupplement(id: string) {
    const index = this.supplements.findIndex((s) => s._id === id);
    this.supplements.splice(index, 1);
  }

  addSupplement(supplement: Supplement) {
    supplement._id = String(this.supplements.length + 1);
    this.supplements.push(supplement);
  }
}
