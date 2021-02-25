import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  getDistrictData() {
    return this.http.get('https://rki.marlon-lueckert.de/api/districts');
  }

  get storedDistrict(): string {
    return window.localStorage.getItem('covid-numbers-selected-district') || "";
  }

  set storedDistrict(value: string) {
    window.localStorage.setItem('covid-numbers-selected-district', value);
  }
}
