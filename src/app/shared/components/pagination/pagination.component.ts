import {
  Component,
  input,
  computed,
  signal,
  linkedSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  pages = input<number>(0);
  currentPage = input<number>(1);
  activePage = linkedSignal(this.currentPage);

  getPagesArray = computed(() => {
    return Array.from(
      {
        length: this.pages(),
      },
      (_, i) => {
        return i + 1;
      }
    );
  });
}
