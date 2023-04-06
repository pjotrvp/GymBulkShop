import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Supplement, SupplementType } from './supplement.model';
import { EntityService } from './entity.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupplementService extends EntityService<Supplement> {
  constructor(protected override http: HttpClient) {
    super(environment.apiUrl, http, 'supplement');
  }

  supplements: Supplement[] = [
    {
      _id: '1',
      name: 'Vitamin Deez Nuts',
      description:
        'Vitamin Deez Nuts is a vitamin that contains vitamin C, D and E',
      supplementType: SupplementType.Vitamin,
      containsLactose: false,
      isVegan: true,
      price: 10,
      flavours: ['Orange', 'Lemon', 'Strawberry'],
      sizes: ['100pc', '200pc', '300pc'],
      reviews: [],
      ingredients: ['Vitamin C', 'Vitamin D', 'Vitamin E'],
      image: '',
    },
    {
      _id: '2',
      name: 'Fish Oil OmegaLulz',
      description:
        'Fish Oil OmegaLulz is a fish oil that contains omega 3 and 6',
      supplementType: SupplementType.FishOil,
      containsLactose: false,
      isVegan: false,
      price: 20,
      flavours: [],
      sizes: ['100pc', '200pc', '300pc'],
      reviews: [],
      ingredients: ['Fish Oil', 'Gelatin'],
      image: '',
    },
    {
      _id: '3',
      name: 'Gold standard whey Protein',
      description:
        'Gold standard whey Protein is a protein that contains whey protein',
      supplementType: SupplementType.Protein,
      containsLactose: false,
      isVegan: false,
      price: 30,
      flavours: ['Chocolate', 'Vanilla', 'Strawberry'],
      sizes: ['100g', '1000g', '2500g'],
      reviews: [],
      ingredients: ['Whey Protein Concentrate', 'Whey Protein Isolate'],
      image: '',
    },
    {
      _id: '4',
      name: 'Micronized Creatine',
      description:
        'Micronized Creatine is a creatine that contains creatine monohydrate',
      supplementType: SupplementType.Creatine,
      containsLactose: false,
      isVegan: false,
      price: 40,
      flavours: ['Unflavoured'],
      sizes: ['100g', '1000g', '2500g'],
      reviews: [],
      ingredients: ['Creatine Monohydrate'],
      image: '',
    },
    {
      _id: '5',
      name: 'Red bull energy drink',
      description:
        'Red bull energy drink is a energy drink that contains caffeine, taurine and glucose',
      supplementType: SupplementType.Other,
      containsLactose: false,
      isVegan: false,
      price: 50,
      flavours: [],
      sizes: ['250ml', '500ml'],
      reviews: [],
      ingredients: ['Caffeine', 'Taurine', 'Glucose'],
      image: '',
    },
    {
      _id: '6',
      name: 'DMAA insane crazy kill it PreWorkout',
      description:
        'DMAA insane crazy kill it PreWorkout is a preworkout that contains DMAA, caffeine and taurine',
      supplementType: SupplementType.PreWorkout,
      containsLactose: false,
      isVegan: false,
      price: 60,
      flavours: ['Tuti Frutti', 'Strawberry', 'Blueberry'],
      sizes: ['500g'],
      reviews: [],
      ingredients: ['DMAA', 'Caffeine', 'Taurine, beta-alanine'],
      image: '',
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
