import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProductCategory } from '../../models/productCategory';
import { ProductService } from '../../services/product.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ParseProductId } from '../../helpers/parseProductId';

@Component({
  selector: 'side-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent implements OnInit {
  private productService: ProductService = inject(ProductService);
  private router: Router = inject(Router);
  productCategories: ProductCategory[] = [];
  @ViewChild('searchInput') searchInput: ElementRef | undefined;
  parseProductId: (url: string) => number = ParseProductId;

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

  capitalizeFirstLetter(category: string): string {
    return (
      String(category).charAt(0).toUpperCase() + category.toLowerCase().slice(1)
    );
  }

  handleSearch(keyword: string): void {
    if (this.searchInput) {
      this.searchInput.nativeElement.value = '';
    }
    this.router.navigateByUrl(`products/search/${keyword}`);
  }
}
