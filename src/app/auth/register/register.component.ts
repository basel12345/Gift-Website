import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { ApisService } from "../../shared/services/apis.service";
import { HandleErrorService } from "../../shared/services/handle-error.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    Name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    userName: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    phone: new FormControl(null, Validators.required),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    message: new FormControl(null, Validators.required),
    role: new FormControl(null, Validators.required),
  }, { validators: this.checkPasswords });
  roles = [{ name: 'Host', value: 'client' }, { name: 'participant', value: 'customer' }];
  constructor(
    private toaster: ToastrService,
    private api: ApisService,
    private handleError: HandleErrorService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  register(form: any) {
    const Form_Data = new FormData();
    Form_Data.append('name', form.Name);
    Form_Data.append('user_name', form.userName);
    Form_Data.append('email', form.email);
    Form_Data.append('password', form.password);
    Form_Data.append('phone', form.phone);
    Form_Data.append('role', form.role);
    this.api.POST('api/v1/auth/register', Form_Data).subscribe(
      (res) => {
        if (form.role === 'client') {
          window.location.replace(`http://giftadmin.ideasqr.com/auth/login`);
        } else {
          this.toaster.success(
            `<span class="text-capitalize">${res.body['message']}</span>`
          );
          this.router.navigateByUrl('/home');
        }
      },
      (error) => {
        this.handleError.handleError(error);
      }
    );
  }

}
