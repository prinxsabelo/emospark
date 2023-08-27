import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(public loaderService: LoaderService, private router: Router) {}

  user_name: any = '';
  public loader: Boolean = false;

  public progressLoader: boolean = true;
  public loginForm = new FormGroup({
    user_name: new FormControl('', [Validators.required]),
  });
  show: boolean = false;

  ngOnInit(): void {
    this.loaderService.emitChange(false);
    this.loaderService.changeEmitted$.subscribe((data: any) => {
      this.progressLoader = data.loader;
    });
  }

  onSubmit() {
    if (this.loginForm.status === 'VALID') {
      this.loader = true;
      setTimeout(() => {
        const userName: any = this.loginForm.value.user_name;
        localStorage.setItem('em_user_name', userName);
        this.router.navigate(['/emotion']);
      }, 1000);
    }
  }
}
