import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardPagesRoutingModule } from './dashboard-pages-routing.module';
import { DashboardPagesComponent } from './dashboard-pages.component';
import { StudentsComponent } from './students/students.component';
import { FormsModule } from '@angular/forms';
import { StudentTranscriptPdfViewComponent } from './student-transcript-pdf-view/student-transcript-pdf-view.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { SchemeOfStudiesComponent } from './scheme-of-studies/scheme-of-studies.component';
import { StudentDataComponent } from './student-data/student-data.component';
import { PloSheetsComponent } from './plo-sheets/plo-sheets.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    DashboardPagesComponent,
    StudentsComponent,
    StudentTranscriptPdfViewComponent,
    SchemeOfStudiesComponent,
    StudentDataComponent,
    PloSheetsComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    DashboardPagesRoutingModule,
    FormsModule,
    NgxExtendedPdfViewerModule
  ]
})
export class DashboardPagesModule { }
