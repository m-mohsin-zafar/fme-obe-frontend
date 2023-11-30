import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  BASE_URL = 'http://localhost:3000/api/student';

  constructor(private _http: HttpClient) { }

  getBatches() {
    return this._http.get(`${this.BASE_URL}/batches`);
  }

  getStudentsByBatch(batch: number) {
    return this._http.get<Student[]>(`${this.BASE_URL}/batch/${batch}`);
  }

  uploadStudentsListFileForVerification(formData: FormData) {
    return this._http.post(`${this.BASE_URL}/upload/verify`, formData);
  }

  submitStudentsForPersistance(students: Student[]) {
    return this._http.post(`${this.BASE_URL}/add-many`, students);
  }
}
