import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './Pages/home/home.component';
import { ProductListComponent } from './Pages/product-list/product-list.component';
import { SupplementComponent } from './Entities/supplement/supplement.component';
import { KitComponent } from './Entities/kit/kit.component';
import { ProductComponent } from './Entities/product/product.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './shared/footer/footer.component';
import { EditProductComponent } from './Edit/edit-product/edit-product.component';
import { FormsModule } from '@angular/forms';
import { AddProductComponent } from './Add/add-product/add-product.component';
import { AboutComponent } from './Pages/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductListComponent,
    SupplementComponent,
    KitComponent,
    ProductComponent,
    FooterComponent,
    EditProductComponent,
    AddProductComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
