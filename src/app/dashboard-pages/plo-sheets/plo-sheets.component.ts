import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plo-sheets',
  templateUrl: './plo-sheets.component.html',
  styleUrls: ['./plo-sheets.component.css']
})
export class PloSheetsComponent implements OnInit {

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
