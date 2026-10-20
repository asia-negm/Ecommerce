import { Component } from '@angular/core';
import { HomeSliderComponent } from './component/home-slider/home-slider.component';

@Component({
  imports: [HomeSliderComponent],
  selector: 'app-home',
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
})
export class HomeComponent {}
