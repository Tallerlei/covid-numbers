import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DistrictData } from 'src/models/district-data.model';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'district-data',
  templateUrl: './district-data.component.html',
  styleUrls: ['./district-data.component.css']
})
export class DistrictDataComponent implements OnInit {
  districtSelectControl: FormControl = new FormControl();
  districtData: DistrictData[] = [];
  selectedDistrict = "";
  selectedDistrictData: DistrictData = new DistrictData();
  validDistrict: boolean = false;

  constructor(
    private dataService: DataService
  ) { 

    this.districtSelectControl.valueChanges.subscribe(change => this.showData(change));
  }

  ngOnInit(): void {
    this.dataService.getDistrictData().subscribe((data: any) => {
      this.districtData = [...data.districts].sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else {
          return 1;
        }
      });
      this.districtSelectControl.setValue(this.dataService.storedDistrict);
      console.log("setting ", this.dataService.storedDistrict);
    });
  }
  
  showData(inputValue: string) {
    console.log("shwi ",inputValue);
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

}
