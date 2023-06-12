import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { TranscriptService } from 'src/app/services/transcript.service';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';
// import { saveAs } from 'file-saver';

@Component({
  selector: 'app-student-transcript-pdf-view',
  templateUrl: './student-transcript-pdf-view.component.html',
  styleUrls: ['./student-transcript-pdf-view.component.css'],
})
export class StudentTranscriptPdfViewComponent implements OnInit {
  // pdfBlob: Blob;
  pdfUrl!: SafeResourceUrl;

  constructor(
    private _transcriptService: TranscriptService,
    private _studentService: StudentService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getPdfData();
  }

  getPdfData() {
    this._transcriptService
      .getTranscriptByStudentId(this._route.snapshot.params['id'])
      .subscribe((blob: Blob) => {

        const url = URL.createObjectURL(blob);
        this.pdfUrl = this._sanitizer.bypassSecurityTrustResourceUrl(url);
        console.log(this.pdfUrl);

      });
  }

}
