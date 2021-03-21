import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DistrictData } from 'src/models/district-data.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  _districtData: DistrictData[] = [];
  districtDataUpdated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  generalData: Observable<any>;
  statesData: Observable<any>;
  constructor(
    private http: HttpClient
  ) {
    this.generalData = this.getGeneralData().pipe(share());
    this.statesData = this.getStatesData().pipe(share());
  }

  get districtData(): DistrictData[] {
    if (this._districtData.length === 0) {
      this._districtData = [{ casesPer100k: 0, casesPerPopulation: 0, count: 0, county: '', deaths: 0, name: '', weekIncidence: 0 }];
      this.http.get('https://rki.marlon-lueckert.de/api/districts').subscribe((data: any) => {
        this._districtData = [...data.districts].sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          } else {
            return 1;
          }
        });
        this.districtDataUpdated$.next(true);
      });
    }
    return this._districtData;
  }

  getGeneralData(): any {
    return this.http.get('https://rki.marlon-lueckert.de/api/general');
  }

  getStatesData(): any {
    return this.http.get('https://rki.marlon-lueckert.de/api/states');
  }

  get storedDistrict(): string {
    return window.localStorage.getItem('covid-numbers-selected-district') || '';
  }

  set storedDistrict(value: string) {
    window.localStorage.setItem('covid-numbers-selected-district', value);
  }

  get storedState(): string {
    return window.localStorage.getItem('covid-numbers-selected-state') || '';
  }

  set storedState(value: string) {
    window.localStorage.setItem('covid-numbers-selected-state', value);
  }
}
