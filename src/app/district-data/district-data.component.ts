import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'district-data',
  templateUrl: './district-data.component.html',
  styleUrls: ['./district-data.component.less']
})
export class DistrictDataComponent implements OnInit {
  districtData: any = null;
  selectedDistrict = "";
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.getDistrictData().subscribe(data => this.districtData = data);
  }

  showData(event: Event, district:string ) {
    this.selectedDistrict = district;

    
  }

}
