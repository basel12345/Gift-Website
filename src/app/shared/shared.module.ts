import { MaterialModule } from './material/material/material.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, FormsModule, MaterialModule],
  exports: [FooterComponent],
})
export class SharedModule {}
