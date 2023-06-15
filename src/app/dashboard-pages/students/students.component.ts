import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Student} from 'src/app/models/student';
import {StudentService} from 'src/app/services/student.service';
import Fuse from 'fuse.js';
import {ActivatedRoute, Router} from '@angular/router';
import {PdfViewerService} from "../../services/pdf-viewer.service";
import {TranscriptService} from "../../services/transcript.service";
import {catchError, finalize, Observable, of, throwError} from "rxjs";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {

  batches: any = [];
  invBatch: boolean = false;
  studentsList: Student[] = [];
  searchKeyword: string = '';
  searchResults: any[] = [];
  selectedBatch!: any;
  gettingTranscripts: Observable<boolean> = of(false);

  constructor(
    private _studentService: StudentService,
    private _transcriptService: TranscriptService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _pvs: PdfViewerService
  ) {
  }

  ngOnInit(): void {
    this._studentService.getBatches().subscribe((response: any) => {
      this.batches = response;
    });
    this._pvs.setHidePdfViewer(true);
  }

  onBatchSelection(batchOption: any) {
    this.selectedBatch = batchOption.value;
    if (!isNaN(this.selectedBatch as number)) {
      this.invBatch = false;
      this._studentService
        .getStudentsByBatch(this.selectedBatch as number)
        .subscribe((response: Student[]) => {
          this.studentsList = response;
          this.searchResults = this.studentsList;
        });
    } else {
      this.invBatch = true;
    }
  }

  performFuzzySearch(keyword: string): Student[] {
    const options = {
      keys: ['Name', 'RegNo'], // Specify the properties to search in your objects
      threshold: 0.1, // Set the matching threshold (0.0 to 1.0)
      caseSensitive: false, // Search without case sensitive
    };

    const fuse = new Fuse(this.studentsList, options);
    const result = fuse.search(keyword);

    return result.map((item) => item.item);
  }

  performSearch(): void {
    let currentRouteArr = this._router.url.split('/');
    let currentRouteParams = currentRouteArr[currentRouteArr.length - 1];

    if (currentRouteParams !== this.searchKeyword) {
      this._pvs.setHidePdfViewer(true);
    } else {
      this._pvs.setHidePdfViewer(false);
    }


    if (this.searchKeyword.trim() === '') {
      this.searchResults = this.studentsList; // Display the original list when no search keyword is entered
    } else {
      this.searchResults = this.performFuzzySearch(this.searchKeyword);
    }
  }

  viewTranscript(event: any, regNo: any) {
    event.stopPropagation();
    this.searchKeyword = regNo.toString();
    this.performSearch(); // search for the student

    this._pvs.setHidePdfViewer(false); // show the pdf viewer

    // current route add to history
    this._router.navigate(['transcript', regNo], {state: {prevUrl: this._router.url}, relativeTo: this._route});

  }

  downloadBatchTranscripts() {

    // Create a temporary anchor element
    const downloadLink = document.createElement('a');
    downloadLink.style.display = 'none'; // Hide the anchor element

    this.gettingTranscripts = of(true); // show loading spinner

    this._transcriptService.getTranscriptsByBatchId(this.selectedBatch).pipe(
      catchError((error) => {
        console.error('Error getting transcripts:', error);
        this.gettingTranscripts = of(false);// hide loading spinner
        return of(error);
      }),
      finalize(() => {
        // Remove the anchor element from the DOM after the download is complete
        this.gettingTranscripts = of(false);// hide loading spinner
        document.body.removeChild(downloadLink);

      })
    )
      .subscribe((blob: Blob) => {
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `${this.selectedBatch}.zip`;

        // Programmatically click the anchor element to start the download
        downloadLink.click();

      }
    );
  }
}
