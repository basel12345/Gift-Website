import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { interceptorProviders } from './shared/interceptors/interceptorProviders';
import { ApisService } from './shared/services/apis.service';
import { AuthGuard } from './shared/guard/auth.guard';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        HttpClientModule,
        ToastrModule.forRoot({
            progressBar: true,
            timeOut: 3000,
            positionClass: 'toast-top-center',
            closeButton: true,
            tapToDismiss: true,
            enableHtml: true,
        }),
        BrowserAnimationsModule,
        SharedModule,
    ],
  providers: [AuthGuard, ApisService, interceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
