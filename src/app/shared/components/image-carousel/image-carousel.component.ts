import { Component, input } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  imports: [],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.css',
})
export class ImageCarouselComponent {
  images = input.required<string[]>();
}
