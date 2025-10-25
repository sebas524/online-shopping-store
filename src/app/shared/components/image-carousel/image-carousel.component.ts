import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';

// import Swiper JS
import Swiper from 'swiper';
// import Swiper styles
import 'swiper/css';
// core version + navigation, pagination modules:
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
@Component({
  selector: 'app-image-carousel',
  standalone: true,
  imports: [],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.css',
  styles: `
  .swiper{
    width: 100%;
    height: 500px;
    background-color: #833;
  }`,
})
export class ImageCarouselComponent implements AfterViewInit {
  images = input.required<string[]>();

  swiperContainer = viewChild.required<ElementRef>('swiperContainer');

  ngAfterViewInit(): void {
    const element = this.swiperContainer().nativeElement;
    if (!element) return;
    console.log('Initializing Swiper on element:', element);

    const swiper = new Swiper(element, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,

      modules: [Navigation, Pagination],

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }
}
