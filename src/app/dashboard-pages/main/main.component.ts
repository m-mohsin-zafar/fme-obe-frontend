import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  noOfBatches: number = 0;
  noOfStudents: number = 0;
  noOfCourses: number = 0;
  noOfSemesters: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
