import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DistrictData } from 'src/models/district-data.model';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'district-data',
  templateUrl: './district-data.component.html',
  styleUrls: ['./district-data.component.css']
})
export class DistrictDataComponent implements OnInit {
  districtSelectControl: FormControl = new FormControl();
  selectedDistrict = "";
  selectedDistrictData: DistrictData = new DistrictData();
  defaultOption:any;
  validDistrict: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dataService: DataService
  ) {
    this.districtSelectControl.valueChanges.subscribe(change => this.showData(change));
    this.selectedDistrictData = this.defaultOption;
  }

  ngOnInit(): void {
    this.dataService.districtDataUpdated$.pipe(
      takeUntil(this.destroy$)
    ). subscribe(
      () => {
        this.districtSelectControl.setValue(this.dataService.storedDistrict);        
      }
    )
    console.log("setting ", this.dataService.storedDistrict);
  }

  showData(inputValue: string) {
    this.selectedDistrict = inputValue;
    this.selectedDistrictData = new DistrictData();
    const foundDistrict = this.districtData.find(district => district.name.toUpperCase() === inputValue.toUpperCase());
    if (foundDistrict) {
      this.selectedDistrictData = foundDistrict;
      this.dataService.storedDistrict = this.selectedDistrict;
    }
    this.validDistrict = foundDistrict ? true : false;
  }

  round(before: number): number {
    return Math.round(before);

  }

  get districtData() {
    return this.dataService.districtData;
  }
}

