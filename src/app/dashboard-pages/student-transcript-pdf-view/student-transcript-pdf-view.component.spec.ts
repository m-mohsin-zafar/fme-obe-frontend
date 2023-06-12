import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTranscriptPdfViewComponent } from './student-transcript-pdf-view.component';

describe('StudentTranscriptPdfViewComponent', () => {
  let component: StudentTranscriptPdfViewComponent;
  let fixture: ComponentFixture<StudentTranscriptPdfViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentTranscriptPdfViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentTranscriptPdfViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
