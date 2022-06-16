import { ApisService } from './../../shared/services/apis.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HandleErrorService } from 'src/app/shared/services/handle-error.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor(
    private toaster: ToastrService,
    private api: ApisService,
    private handleError: HandleErrorService
  ) {}

  contactUsForm: FormGroup = new FormGroup({
    full_name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, Validators.required),
    message: new FormControl(null, Validators.required),
  });

  submitContact(form: any) {
    const Form_Data = new FormData();
    if (form.full_name) {
      Form_Data.append('full_name', form.full_name);
    }
    if (form.email) {
      Form_Data.append('email', form.email);
    }
    if (form.phone) {
      Form_Data.append('phone', form.phone);
    }
    if (form.message) {
      Form_Data.append('message', form.message);
    }
    this.api.POST('api/v1/contact-us', Form_Data).subscribe(
      (res) => {
        this.contactUsForm.reset();        
        this.toaster.success(
          `<span class="text-capitalize">${res.body['message']}</span>`
        );
      },
      (error) => {
        this.handleError.handleError(error);
      }
    );
  }

  ngOnInit(): void {}
}
