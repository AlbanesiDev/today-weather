import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule],
  template: `
    <span class="p-input-icon-right">
      <i class="pi" [ngClass]="{ 'pi-spin pi-spinner': search, 'pi-search': !search }"></i>
      <input type="text" pInputText [(ngModel)]="value" />
    </span>
  `,
  styleUrl: './searchbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchbarComponent {
  value: string = '';
  search: boolean = false;
}
