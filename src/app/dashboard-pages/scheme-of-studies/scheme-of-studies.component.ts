import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scheme-of-studies',
  templateUrl: './scheme-of-studies.component.html',
  styleUrls: ['./scheme-of-studies.component.css']
})
export class SchemeOfStudiesComponent implements OnInit {

  file: File | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  submitFile() {
    console.log(this.file);
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file);

      // this.uploadFile(formData);
    }

  }



}
