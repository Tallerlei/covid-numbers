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
}
