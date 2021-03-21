import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DistrictData } from 'src/models/district-data.model';
import { DataService } from 'src/services/data.service';
import { OrderByPipe } from '../order-by.pipe';
@Component({
  selector: 'district-data',
  templateUrl: './district-data.component.html',
  styleUrls: ['./district-data.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DistrictDataComponent implements OnInit {
  districtSelectControl: FormControl = new FormControl();
  selectedDistrict = '';
  selectedDistrictData: DistrictData = new DistrictData();
  defaultOption: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  _orderedByIncidences: any = null;

  constructor(
    private dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {
    this.districtSelectControl.valueChanges.subscribe(change => this.showData(change));
    this.selectedDistrictData = this.defaultOption;
  }

  ngOnInit(): void {
    this.dataService.districtDataUpdated$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      () => {
        this.districtSelectControl.setValue(this.dataService.storedDistrict);
        this._orderedByIncidences = null;
        this.cdr.markForCheck();
      }
    );
  }

  showData(inputValue: string): void {
    this.selectedDistrict = inputValue;
    this.selectedDistrictData = new DistrictData();
    const foundDistrict = this.districtData.find(district => district.name.toUpperCase() === inputValue.toUpperCase());
    if (foundDistrict) {
      this.selectedDistrictData = foundDistrict;
      this.dataService.storedDistrict = this.selectedDistrict;
    }
  }

  round(before: number): number {
    return Math.round(before);
  }

  incidencePlace(district: DistrictData): number {
    return this.orderedByIncidences.indexOf(district) + 1;
  }

  selectFromIncidenceList(event: Event, district: DistrictData): void {
    this.districtSelectControl.setValue(district.name);
  }

  get orderedByIncidences(): DistrictData[] {
    if (this._orderedByIncidences === null) {
      this._orderedByIncidences = Object.assign([], this.districtData);
      return new OrderByPipe().transform(this._orderedByIncidences, 'weekIncidence', true);
    } else {
      return this._orderedByIncidences;
    }
  }

  get districtData(): DistrictData[] {
    return this.dataService.districtData;
  }
}

