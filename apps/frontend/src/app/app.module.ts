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
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AddCommentComponent } from './Add/add-comment/add-comment.component';
import { ReviewComponent } from './Entities/review/review.component';
import { EditReviewComponent } from './Edit/edit-review/edit-review.component';
import { ReviewListComponent } from './Pages/review-list/review-list.component';

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
    AuthenticationComponent,
    AddCommentComponent,
    ReviewComponent,
    EditReviewComponent,
    ReviewListComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
