import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SchemeOfStudies } from '../models/scheme-of-studies';

@Injectable({
  providedIn: 'root'
})
export class SchemeOfStudiesService {

  private BASE_URL = 'http://localhost:3000/api/scheme-of-studies';

  constructor(private _http: HttpClient) { }

  uploadSchemeForVerification(formData: FormData) {
    return this._http.post(`${this.BASE_URL}/verify`, formData);
  }

  submitSchemeForPersistance(scheme: any) {
    return this._http.post<SchemeOfStudies>(`${this.BASE_URL}/add-many`, scheme);
  }
}
