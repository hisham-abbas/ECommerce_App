import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Lang = 'ar' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private langSubject = new BehaviorSubject<Lang>('ar'); // default language
  lang$ = this.langSubject.asObservable();

  constructor() {
    // optional: load language from localStorage
    const savedLang = localStorage.getItem('app-lang') as Lang;
    if (savedLang) {
      this.langSubject.next(savedLang);
    }
  }

  toggleLang() {
    const newLang: Lang = this.langSubject.value === 'ar' ? 'en' : 'ar';
    this.langSubject.next(newLang);
    localStorage.setItem('app-lang', newLang);
  }

  setLang(lang: Lang) {
    this.langSubject.next(lang);
    localStorage.setItem('app-lang', lang);
  }

  get currentLang(): Lang {
    return this.langSubject.value;
  }
}
