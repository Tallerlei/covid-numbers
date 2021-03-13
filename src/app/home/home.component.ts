import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public dataService: DataService

  ) { }

  ngOnInit(): void {
  }


  round(input: number) {
    return Math.round(input);
  }

  formatNumber(input: number) {
    return input.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
}
