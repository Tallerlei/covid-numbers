import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from 'src/services/data.service';

import { formatDate } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

registerLocaleData(localeDe);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public dataService: DataService

  ) { }

  round(input: number): number {
    return Math.round(input);
  }

  formatNumber(input: number): string {
    return input.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  createDate(milliseconds: number): any {
    return formatDate(milliseconds, 'short', 'de');
  }
}
