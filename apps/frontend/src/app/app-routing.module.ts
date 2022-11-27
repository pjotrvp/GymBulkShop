import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home.component';
import { ProductListComponent } from './Pages/product-list/product-list.component';
import { SupplementComponent } from './Entities/supplement/supplement.component';
import { EditProductComponent } from './Edit/edit-product/edit-product.component';
import { AddProductComponent } from './Add/add-product/add-product.component';
import { AboutComponent } from './Pages/about/about.component';
import { ReviewComponent } from './Entities/review/review.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
    ],
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'supplements',
    component: ProductListComponent,
  },
  {
    path: 'supplements',
    children: [
      {
        path: 'add',
        component: AddProductComponent,
      },
      {
        path: ':id',
        component: SupplementComponent,
      },
      {
        path: ':id',
        children: [
          {
            path: 'edit',
            component: EditProductComponent,
          },
        ],
      }
      
    ]
  },
  {
    path: '**',
    redirectTo: '/home',
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
