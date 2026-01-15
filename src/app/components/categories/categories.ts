import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category';
import { LanguageService } from '../../services/lang';
import { combineLatest, map, BehaviorSubject } from 'rxjs';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.html',
  styleUrls: ['./categories.css'],
})
export class CategoriesComponent {

  private categoryService = inject(CategoryService);
  private langService = inject(LanguageService);
  env = environment;

  // 🔍 search text
  private search$ = new BehaviorSubject<string>('');

  vm$ = combineLatest([
    this.langService.lang$,
    this.categoryService.getActiveCategories(),
    this.search$
  ]).pipe(
    map(([lang, categories, search]) => {
      const term = search.toLowerCase().trim();

      const filteredCategories = categories.filter(c => {
        const name = lang === 'ar' ? c.nameAr : c.nameEn;
        return !term || name.toLowerCase().includes(term);
      });

      return {
        lang,
        categories: filteredCategories
      };
    })
  );

  onSearch(value: string) {
    this.search$.next(value);
  }
}
