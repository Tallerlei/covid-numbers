import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/services/data.service';
import { formatDate } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

registerLocaleData(localeDe);
@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent implements OnInit {

  stateSelectControl: FormControl = new FormControl();
  selectedState = '';
  selectedStateData: any = null;
  constructor(
    public dataService: DataService
  ) {
    this.stateSelectControl.valueChanges.subscribe(change => this.showData(change));
  }

  ngOnInit(): void {
    if (this.dataService.storedState.length > 0) {
      this.dataService.statesData.forEach((data) => {
        data.states.forEach((stateToCheck: any) => {
          if (stateToCheck.name === JSON.parse(this.dataService.storedState).name) {
            this.stateSelectControl.setValue(stateToCheck);
          }
        });
      });
    }
  }

  showData(inputValue: any): void {
    if (!inputValue) {
      inputValue = this.dataService.storedState;
    }
    this.selectedStateData = inputValue;
    this.dataService.storedState = JSON.stringify(inputValue);
  }

  round(input: number): number {
    return Math.round(input);
  }

  createDate(milliseconds: number): any {
    return formatDate(milliseconds, 'short', 'de');
  }
}
