import { Component, OnInit } from '@angular/core';
import { SchemeOfStudies } from 'src/app/models/scheme-of-studies';
import { SchemeOfStudiesService } from 'src/app/services/scheme-of-studies.service';

@Component({
  selector: 'app-scheme-of-studies',
  templateUrl: './scheme-of-studies.component.html',
  styleUrls: ['./scheme-of-studies.component.css']
})
export class SchemeOfStudiesComponent implements OnInit {

  file: File | null = null;
  fileUploadSuccess = false;
  scheme: SchemeOfStudies[] = [];
  schemeSubmissionStatus = {
    success: false,
    error: false,
    message: ''
  }

  constructor(private schemeService: SchemeOfStudiesService) { }

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
    this.fileUploadSuccess = false;
    this.resetSchemeSubmissionStatus();
  }

  submitFile() {
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file);

      this.schemeService.uploadSchemeForVerification(formData)
        .subscribe((res: any) => {
          this.fileUploadSuccess = true;
          this.scheme = res;
        }, (err: any) => {
          console.log(err);
          this.fileUploadSuccess = false;
        });
    }
    this.resetSchemeSubmissionStatus();
  }

  submitScheme(){
    this.schemeService.submitSchemeForPersistance(this.scheme)
      .subscribe((res: any) => {
        this.schemeSubmissionStatus = {
          success: true,
          error: false,
          message: res.count == 0 ? `There were duplicates, and therefore, nothing was added to database.` : `Successfully added ${res.count} Schemes to the database.`
        }
      }, (err: any) => {
        this.schemeSubmissionStatus = {
          success: false,
          error: true,
          message: `Error: ${err.message}`
        }
      });

    this.resetFileUploadStatus();
  }

  private resetFileUploadStatus() {
    this.file = null;
    this.fileUploadSuccess = false;
  }

  private resetSchemeSubmissionStatus() {
    this.schemeSubmissionStatus = {
      success: false,
      error: false,
      message: ''
    }
  }

}
