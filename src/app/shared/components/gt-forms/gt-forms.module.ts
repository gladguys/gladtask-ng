import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';

import { GTFormErrorComponent } from './gt-form-error/gt-form-error.component';
import { GTFormSuccessComponent } from './gt-form-success/gt-form-success.component';

@NgModule({
  declarations: [GTFormErrorComponent, GTFormSuccessComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    GTFormErrorComponent,
    GTFormSuccessComponent,
  ],
})
export class GTFormsModule {
  constructor() {
    library.add(faCheckDouble);
  }
}
