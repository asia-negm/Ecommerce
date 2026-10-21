import { Component } from '@angular/core';
import { HomeSliderComponent } from './component/home-slider/home-slider.component';
import { HomeCategoryComponent } from './component/home-slider/home-category/home-category.component';
import { HomeProductsComponent } from './component/home-slider/home-products/home-products.component';

@Component({
  imports: [HomeSliderComponent , HomeCategoryComponent , HomeProductsComponent],
  selector: 'app-home',
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
})
export class HomeComponent {}
