import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardPagesRoutingModule } from './dashboard-pages-routing.module';
import { DashboardPagesComponent } from './dashboard-pages.component';
import { StudentsComponent } from './students/students.component';
import { FormsModule } from '@angular/forms';
import { StudentTranscriptPdfViewComponent } from './student-transcript-pdf-view/student-transcript-pdf-view.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
  declarations: [
    DashboardPagesComponent,
    StudentsComponent,
    StudentTranscriptPdfViewComponent
  ],
  imports: [
    CommonModule,
    DashboardPagesRoutingModule,
    FormsModule,
    NgxExtendedPdfViewerModule
  ]
})
export class DashboardPagesModule { }
