import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'productImage',
  standalone: true,
})
export class ProductImagePipe implements PipeTransform {
  transform(value: string | string[] | null | undefined): string {
    const placeholder = './assets/images/no-image.jpg';
    const baseUrl = `${environment.baseUrl}/files/product/`;

    if (!value) return placeholder;

    if (Array.isArray(value)) {
      const firstImage = value.length > 0 ? value[0] : null;
      return firstImage ? this.resolveUrl(firstImage, baseUrl) : placeholder;
    }

    if (typeof value === 'string') {
      return this.resolveUrl(value, baseUrl);
    }

    return placeholder;
  }

  private resolveUrl(fileName: string, baseUrl: string): string {
    // If the filename is already a full URL, just return it
    if (fileName.startsWith('http')) return fileName;
    // Otherwise, build the full path to your backend file
    return `${baseUrl}${fileName}`;
  }
}
