import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-favs',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>favs works!</p>`,
  styleUrl: './favs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavsComponent { }
