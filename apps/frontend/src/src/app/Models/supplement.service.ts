import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Supplement, SupplementType } from './supplement.model';

@Injectable({
  providedIn: 'root',
})
export class SupplementService {
  
  supplements: Supplement[] = [
    {
      _id: '1',
      name: 'Vitamin Deez Nuts',
      supplementType: SupplementType.Vitamin,
      containsLactose: false,
      isVegan: true,
      price: 10,
      flavours: ['Orange', 'Lemon', 'Strawberry'],
      sizes: ['100pc', '200pc', '300pc'],
      reviews: [],
      ingredients: ['Vitamin C', 'Vitamin D', 'Vitamin E'],
    },
    {
      _id: '2',
      name: 'Fish Oil OmegaLulz',
      supplementType: SupplementType.FishOil,
      containsLactose: false,
      isVegan: false,
      price: 20,
      flavours: [],
      sizes: ['100pc', '200pc', '300pc'],
      reviews: [],
      ingredients: ['Fish Oil', 'Gelatin'],
    },
    {
      _id: '3',
      name: 'Gold standard whey Protein',
      supplementType: SupplementType.Protein,
      containsLactose: false,
      isVegan: false,
      price: 30,
      flavours: ['Chocolate', 'Vanilla', 'Strawberry'],
      sizes: ['100g', '1000g', '2500g'],
      reviews: [],
      ingredients: ['Whey Protein Concentrate', 'Whey Protein Isolate'],
    },
    {
      _id: '4',
      name: 'Micronized Creatine',
      supplementType: SupplementType.Creatine,
      containsLactose: false,
      isVegan: false,
      price: 40,
      flavours: ['Unflavoured'],
      sizes: ['100g', '1000g', '2500g'],
      reviews: [],
      ingredients: ['Creatine Monohydrate'],
    },
    {
      _id: '5',
      name: 'Red bull energy drink',
      supplementType: SupplementType.Other,
      containsLactose: false,
      isVegan: false,
      price: 50,
      flavours: [],
      sizes: ['250ml', '500ml'],
      reviews: [],
      ingredients: ['Caffeine', 'Taurine', 'Glucose'],
    },
    {
      _id: '6',
      name: 'DMAA insane crazy kill it PreWorkout',
      supplementType: SupplementType.PreWorkout,
      containsLactose: false,
      isVegan: false,
      price: 60,
      flavours: ['Tuti Frutti', 'Strawberry', 'Blueberry'],
      sizes: ['500g'],
      reviews: [],
      ingredients: ['DMAA', 'Caffeine', 'Taurine, beta-alanine'],
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
