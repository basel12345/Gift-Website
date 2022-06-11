import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MaterialModule} from "../shared/material/material/material.module";

@NgModule({
  declarations: [ContactComponent],
    imports: [
        CommonModule,
        ContactRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
    ],
})
export class ContactModule {}
