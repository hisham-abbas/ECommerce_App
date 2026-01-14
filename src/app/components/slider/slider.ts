import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SliderService } from '../../services/slider';
import { Slider } from '../../models/slider';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-slider',
  imports: [CommonModule],
  templateUrl: './slider.html',
  styleUrls: ['./slider.css']
})
export class SliderComponent implements OnInit, AfterViewInit {

  sliders: Slider[] = [];

  constructor(private sliderService: SliderService) {}

  ngOnInit(): void {
    this.sliderService.getActiveSliders().subscribe(res => {
      this.sliders = res.filter(x => x.isActive);
    });
  }

    ngAfterViewInit(): void {
    const el = document.getElementById('carouselExampleCaptions');
    if (el) {
      new bootstrap.Carousel(el, {
        interval: 3000,
        ride: 'carousel',
        pause: 'hover'
      });
    }
  }
}
