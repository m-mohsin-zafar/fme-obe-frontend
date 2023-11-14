import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PloService {

  private BASE_URL = 'http://localhost:3000/api/plo';

  constructor(private _http: HttpClient) { }

  uploadPLOSheetForVerification(formData: FormData) {
    return this._http.post(`${this.BASE_URL}/verify`, formData);
  }

  submitPLODataForPersistance(ploData: any) {
    return this._http.post(`${this.BASE_URL}/add-many`, ploData);
  }
}
