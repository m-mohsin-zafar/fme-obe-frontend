import {Component, Input, OnDestroy, OnInit, SecurityContext} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentService} from 'src/app/services/student.service';
import {TranscriptService} from 'src/app/services/transcript.service';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';
import {finalize, map, Observable, Subscription} from "rxjs";
import {PdfViewerService} from "../../services/pdf-viewer.service";


@Component({
  selector: 'app-student-transcript-pdf-view',
  templateUrl: './student-transcript-pdf-view.component.html',
  styleUrls: ['./student-transcript-pdf-view.component.css'],
})
export class StudentTranscriptPdfViewComponent implements OnInit, OnDestroy {

  // pdfUrl$!: Observable<SafeResourceUrl>;
  // studentRegNo!: number;
  // loading: boolean = true;
  // hidePdfViewer: boolean = false;
  // private subscription!: Subscription;
  //
  //
  // constructor(
  //   private _transcriptService: TranscriptService,
  //   private _studentService: StudentService,
  //   private _route: ActivatedRoute,
  //   private _router: Router,
  //   private _sanitizer: DomSanitizer,
  //   private _pvs: PdfViewerService
  // ) {
  // }
  //
  // ngOnInit(): void {
  //   this.subscription = this._pvs.hidePdfViewer$.subscribe((value) => {
  //     this.hidePdfViewer = value;
  //   });
  //   this._route.params.subscribe((response: any) => {
  //     this.studentRegNo = response['id'];
  //     // this.loading = true;
  //     this.getPdfData();
  //   });
  // }
  //
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
  //
  // getPdfData() {
  //   this.pdfUrl$ = this._transcriptService.getTranscriptByStudentId(this.studentRegNo).pipe(
  //     map((blob: Blob) => {
  //       const url = URL.createObjectURL(blob);
  //       return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  //     }), finalize(() => {
  //       this.loading = false;
  //     })
  //   );
  // }


  pdfUrl: SafeResourceUrl | undefined;
  studentRegNo!: number;
  loading = true;
  hidePdfViewer = false;
  private subscription!: Subscription;

  constructor(
    private _transcriptService: TranscriptService,
    private _studentService: StudentService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _sanitizer: DomSanitizer,
    private _pvs: PdfViewerService
  ) {}

  ngOnInit(): void {
    this.subscription = this._pvs.hidePdfViewer$.subscribe((value) => {
      this.hidePdfViewer = value;
    });
    this._route.params.subscribe((response: any) => {
      this.studentRegNo = response['id'];
      this.getPdfData();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getPdfData() {
    this._transcriptService
      .getTranscriptByStudentId(this.studentRegNo)
      .pipe(
        map((blob: Blob) => {
          const url = URL.createObjectURL(blob);
          return this._sanitizer.bypassSecurityTrustResourceUrl(url);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((safeUrl: SafeResourceUrl) => {
        this.pdfUrl = safeUrl;
      });
  }


}
