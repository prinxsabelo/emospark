import { Injectable } from '@angular/core';
import { LoaderService } from './loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SuccessMessageService {
  constructor(
    private snackbar: MatSnackBar,
    public loaderService: LoaderService
  ) {}

  addedMessage(message: any) {
    this.snackbar.open(`${message} added successfully`, '', {
      duration: 4000,
      panelClass: ['success'],
    });
    setTimeout(() => {
      this.loaderService.emitChange(false);
    }, 1000);
  }

  editedMessage(message: any) {
    this.snackbar.open(`${message} edited successfully`, '', {
      duration: 4000,
      panelClass: ['success'],
    });
    setTimeout(() => {
      this.loaderService.emitChange(false);
    }, 1000);
  }

  deletedMessage(message: any) {
    this.snackbar.open(`${message} deleted successfully`, '', {
      duration: 4000,
      panelClass: ['success'],
    });
    setTimeout(() => {
      this.loaderService.emitChange(false);
    }, 1000);
  }

  actionMessage(message: any) {
    this.snackbar.open(`${message}  successfully`, '', {
      duration: 4000,
      panelClass: ['success'],
    });
    setTimeout(() => {
      this.loaderService.emitChange(false);
    }, 1000);
  }

  clearLoader() {
    setTimeout(() => {
      this.loaderService.emitChange(false);
    }, 1000);
  }
}
