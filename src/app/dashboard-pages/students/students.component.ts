import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import Fuse from 'fuse.js';
import { Router } from '@angular/router';

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

  constructor(
    private _studentService: StudentService,
    private _router: Router
    ) {}

  ngOnInit(): void {
    this._studentService.getBatches().subscribe((response: any) => {
      this.batches = response;
    });
  }

  onBatchSelection(batchOption: any) {
    let selectedBatch = batchOption.value;
    if (!isNaN(selectedBatch as number)) {
      this.invBatch = false;
      this._studentService
        .getStudentsByBatch(selectedBatch as number)
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
      threshold: 0.3, // Set the matching threshold (0.0 to 1.0)
    };

    const fuse = new Fuse(this.studentsList, options);
    const result = fuse.search(keyword);

    return result.map((item) => item.item);
  }

  performSearch(): void {
    if (this.searchKeyword.trim() === '') {
      this.searchResults = this.studentsList; // Display the original list when no search keyword is entered
    } else {
      this.searchResults = this.performFuzzySearch(this.searchKeyword);
    }
  }

  viewTranscript(regNo: any) {
    // current route add to history
    this._router.navigate(['students/transcript', regNo]);
  }
}
