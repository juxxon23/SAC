import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  constructor(
    private spinner: NgxSpinnerService
  ) {}

  public llamarSpinner() {
    return this.spinner.show();
  }

  public detenerSpinner() {
    return this.spinner.hide();
  }
}
