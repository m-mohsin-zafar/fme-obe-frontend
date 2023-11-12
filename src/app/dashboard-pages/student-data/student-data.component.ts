import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-data',
  templateUrl: './student-data.component.html',
  styleUrls: ['./student-data.component.css']
})
export class StudentDataComponent implements OnInit {

  file: File | null = null;
  fileUploadSuccess = false;
  students: Student[] = [];
  studentListSubmissionStatus = {
    success: false,
    error: false,
    message: ''
  }

  constructor(private studentsService: StudentService) { }

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
    this.fileUploadSuccess = false;
    this.resetStudentListSubmissionStatus();
  }

  submitFile() {
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file);

      this.studentsService.uploadStudentsListFileForVerification(formData)
        .subscribe((res: any) => {
          this.fileUploadSuccess = true;
          this.students = res;
        }, (err: any) => {
          console.log(err);
          this.fileUploadSuccess = false;
        });
    }
    this.resetStudentListSubmissionStatus();
  }

  submitStudents(){
    this.studentsService.submitStudentsForPersistance(this.students)
      .subscribe((res: any) => {
        this.studentListSubmissionStatus = {
          success: true,
          error: false,
          message: `Successfully added ${res.count} students to the database.`
        }
      }, (err: any) => {
        this.studentListSubmissionStatus = {
          success: false,
          error: true,
          message: 'Error adding students to the database.'
        }
      });

    this.resetFileUploadStatus();
  }

  private resetFileUploadStatus() {
    this.file = null;
    this.fileUploadSuccess = false;
  }

  private resetStudentListSubmissionStatus() {
    this.studentListSubmissionStatus = {
      success: false,
      error: false,
      message: ''
    }
  }

}
