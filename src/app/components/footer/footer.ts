import { Component, OnInit, inject } from '@angular/core';
import { LanguageService } from '../../services/lang';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();
  lang = 'en';

  private langService = inject(LanguageService);

  ngOnInit(): void {
    this.langService.lang$.subscribe(lang => {
      this.lang = lang;
    });
  }
}
