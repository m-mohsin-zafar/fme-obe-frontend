import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfViewerService {

  private hidePdfViewerSubject = new BehaviorSubject<boolean>(false);
  hidePdfViewer$ = this.hidePdfViewerSubject.asObservable();

  constructor() {
  }

  setHidePdfViewer(value: boolean) {
    this.hidePdfViewerSubject.next(value);
  }
}
