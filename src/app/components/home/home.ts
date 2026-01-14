import { Component } from '@angular/core';
import { ProductsComponent } from '../products/products';
import { BestOffersComponent } from '../bestoffers/bestoffers';
import { CategoriesComponent } from '../categories/categories';
import { SliderComponent } from '../slider/slider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SliderComponent,
    CategoriesComponent,
    BestOffersComponent,
    ProductsComponent,
    CommonModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
