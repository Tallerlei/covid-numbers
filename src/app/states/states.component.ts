import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent implements OnInit {

  stateSelectControl: FormControl = new FormControl();
  selectedState = "";
  selectedStateData: any = null;

  constructor(
    public dataService: DataService
  ) { 
    
    this.stateSelectControl.valueChanges.subscribe(change => this.showData(change));
  }

  ngOnInit(): void {
  }

  showData(inputValue: string) {
    this.selectedStateData = inputValue;
  }

  round(input: number) {
    return Math.round(input);
  }
}
