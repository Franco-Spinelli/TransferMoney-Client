import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-circle',
  templateUrl: './loading-circle.component.html',
  styleUrl: './loading-circle.component.css'
})
export class LoadingCircleComponent {
  isLoading = false;

  startLoading() {
    this.isLoading = true;
  }

  stopLoading() {
    this.isLoading = false;
  }
}
