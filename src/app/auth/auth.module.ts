import { SharedModule } from './../shared/shared.module';
import { MaterialModule } from './../shared/material/material/material.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Routing
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
// Components
// Angular Materail Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        SharedModule,
        MatSelectModule,
    ],
})
export class AuthModule {}
