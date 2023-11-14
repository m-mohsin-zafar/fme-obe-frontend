import { Component, OnInit } from '@angular/core';
import { PLOData } from 'src/app/models/plo-data';
import { PloService } from 'src/app/services/plo.service';

@Component({
  selector: 'app-plo-sheets',
  templateUrl: './plo-sheets.component.html',
  styleUrls: ['./plo-sheets.component.css']
})
export class PloSheetsComponent implements OnInit {

  file: File | null = null;
  fileUploadSuccess = false;
  ploData: PLOData[] = [];
  ploDataSubmissionStatus = {
    success: false,
    error: false,
    message: ''
  }

  constructor(private ploService: PloService) { }

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
    this.fileUploadSuccess = false;
    this.resetPLODataSubmissionStatus();
  }

  submitFile() {
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file);

      this.ploService.uploadPLOSheetForVerification(formData)
        .subscribe((res: any) => {
          this.fileUploadSuccess = true;
          this.ploData = res;
        }, (err: any) => {
          console.log(err);
          this.fileUploadSuccess = false;
        });
    }
    this.resetPLODataSubmissionStatus();
  }

  submitPLOData(){
    this.ploService.submitPLODataForPersistance(this.ploData)
      .subscribe((res: any) => {
        this.ploDataSubmissionStatus = {
          success: true,
          error: false,
          message: res.count == 0 ? `There were duplicates, and therefore, nothing was added to database.` : `Successfully added ${res.count} Rows of PLO Sheet to the database.`
        }
      }, (err: any) => {
        this.ploDataSubmissionStatus = {
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

  private resetPLODataSubmissionStatus() {
    this.ploDataSubmissionStatus = {
      success: false,
      error: false,
      message: ''
    }
  }
}
