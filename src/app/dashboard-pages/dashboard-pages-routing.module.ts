import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardPagesComponent} from './dashboard-pages.component';
import {StudentsComponent} from './students/students.component';
import {StudentTranscriptPdfViewComponent} from './student-transcript-pdf-view/student-transcript-pdf-view.component';

const routes: Routes = [
  {path: '', component: DashboardPagesComponent},
  {
    path: 'students', component: StudentsComponent,
    children: [
      {path: 'transcript/:id', component: StudentTranscriptPdfViewComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardPagesRoutingModule {
}
