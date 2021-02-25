import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'covid-numbers';
  _copyRightYear: number = 0;

  constructor(

  ) { }

  ngOnInit(): void {
  }

  get copyRightYear(): number {
    if (this._copyRightYear === 0) {
      this._copyRightYear = new Date().getFullYear();

    }
    return this._copyRightYear;
  }

}
