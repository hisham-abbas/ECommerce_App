import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category-service';
import { Category } from '../../../models/category';
import { BehaviorSubject } from 'rxjs';
import { Observable, Subject, merge, map, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories-list.html',
  styleUrls: ['./categories-list.css']
})
export class AdminCategoriesComponent implements OnInit {

  // 🔍 search
private search$ = new BehaviorSubject<string>('');

  private categoryService = inject(CategoryService);

  // 🔹 refresh trigger
  private refresh$ = new Subject<void>();

  // 🔹 Reactive ViewModel
  vm$!: Observable<{ categories: Category[]; loading: boolean }>;

  // 🔹 UI state
  isEdit = false;

  // 🔹 Form model
  form: Category = {
    categoryId: 0,
    nameAr: '',
    nameEn: '',
    descriptionAr: '',
    descriptionEn: '',
    isActive: true,
  };

  // ================= LIFECYCLE =================
  ngOnInit(): void {
    this.initVm();
  }

  // ================= VM =================
  initVm() {
  this.vm$ = merge(
    this.refresh$.pipe(startWith(null)),
    this.search$
  ).pipe(
    switchMap(() =>
      this.categoryService.getAll().pipe(
        map(categories => {
          const term = this.search$.value.toLowerCase().trim();

          const filtered = categories.filter(c =>
            !term ||
            c.nameAr.toLowerCase().includes(term) ||
            c.nameEn.toLowerCase().includes(term)
          );

          return {
            loading: false,
            categories: filtered
          };
        }),
        startWith({
          loading: true,
          categories: []
        })
      )
    )
  );
}


  refresh() {
    this.refresh$.next();
  }

  // ================= CRUD =================
 submit(formRef: any) {

  if (formRef.invalid) {
    return;
  }

  if (!this.form.nameAr.trim() || !this.form.nameEn.trim()) {
    return;
  }

  const req$ = this.isEdit
    ? this.categoryService.update(this.form.categoryId, this.form)
    : this.categoryService.create(this.form);

  req$.subscribe(() => {
    this.resetForm();
    this.refresh();
    formRef.resetForm(); // ✅ reset validation كمان
  });
}


  edit(category: Category) {
    this.isEdit = true;
    this.form = { ...category };
  }

  hideCategory(id: number) {
    if (!confirm('متأكد إنك عايز تخفي الفئة؟')) return;

    this.categoryService.delete(id).subscribe(() => {
      this.refresh(); // ✅ تحديث فوري
    });
  }

  toggleActive(category: Category) {
    this.categoryService.update(category.categoryId, {
      ...category,
      isActive: !category.isActive,
    }).subscribe(() => this.refresh());
  }

  resetForm() {
    this.isEdit = false;
    this.form = {
      categoryId: 0,
      nameAr: '',
      nameEn: '',
      descriptionAr: '',
      descriptionEn: '',
      isActive: true,
    };
  }
  onSearch(value: string) {
  this.search$.next(value);
}

}
