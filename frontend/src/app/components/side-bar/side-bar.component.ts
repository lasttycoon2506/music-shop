import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import { ProductCategory } from '../../models/productCategory';
import { ProductService } from '../../services/product.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'side-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);
  productCategories: ProductCategory[] = [];
  @ViewChild('searchInput') searchInput: ElementRef | undefined;

  ngOnInit(): void {
    this.loadProductCategories();
  }

  loadProductCategories(): void {
    this.productService.getProductCategories().subscribe({
      next: (data) => {
        this.productCategories = data;
      },
    });
  }

  parseId(url: string): string {
    const productId = url.match(/\d+$/)![0];
    return productId;
  }

  capitalizeFirstLetter(category: string) {
    return (
      String(category).charAt(0).toUpperCase() + category.toLowerCase().slice(1)
    );
  }

  handleSearch(keyword: string) {
    if (this.searchInput) {
      this.searchInput.nativeElement.value = '';
    }
    this.router.navigateByUrl(`products/search/${keyword}`);
  }
}
