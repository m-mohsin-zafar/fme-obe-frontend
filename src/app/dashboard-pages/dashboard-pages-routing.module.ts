import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardPagesComponent} from './dashboard-pages.component';
import {StudentsComponent} from './students/students.component';
import {StudentTranscriptPdfViewComponent} from './student-transcript-pdf-view/student-transcript-pdf-view.component';
import {SchemeOfStudiesComponent} from "./scheme-of-studies/scheme-of-studies.component";
import {StudentDataComponent} from "./student-data/student-data.component";
import {PloSheetsComponent} from "./plo-sheets/plo-sheets.component";

const routes: Routes = [
  {path: '', component: DashboardPagesComponent},
  {
    path: 'students', component: StudentsComponent,
    children: [
      {path: 'transcript/:id', component: StudentTranscriptPdfViewComponent}
    ]
  },
  { path: 'upload/scheme', component: SchemeOfStudiesComponent},
  { path: 'upload/students', component: StudentDataComponent},
  { path: 'upload/plo-data', component: PloSheetsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardPagesRoutingModule {
}
