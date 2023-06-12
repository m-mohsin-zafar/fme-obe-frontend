import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranscriptService {

  BASE_URL = 'http://localhost:3000/api/transcript';

  constructor(
    private _http: HttpClient
  ) { }

  getTranscriptByStudentId(id: number) {
    return this._http.get(`${this.BASE_URL}/pdf/${id}`, {responseType: 'blob'});
  }
}
