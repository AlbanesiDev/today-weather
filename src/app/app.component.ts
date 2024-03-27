import { ThemesService } from './core/themes/themes.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ThemesComponent } from './core/themes/themes.component';
import { LangService } from './core/lang/lang.service';
import { WeatherIconsService } from './core/services/weather-icons.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ThemesComponent],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  private themesService: ThemesService = inject(ThemesService);
  private weatherIconsService: WeatherIconsService = inject(WeatherIconsService);
  private langService: LangService = inject(LangService);

  ngOnInit(): void {
    this.langService.initializeLang();
  }
}
