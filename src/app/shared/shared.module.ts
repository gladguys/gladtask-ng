import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

import { LoggedOnlyDirective } from './directives/logged-only.directive';
import { AdminOnlyDirective } from './directives/admin-only.directive';

import { GTToolbarModule } from './components/gt-toolbar/gt-toolbar.module';
import { MaterialModule } from './components/material/material.module';
import { GTFormsModule } from './components/gt-forms/gt-forms.module';
import { GTDatatableModule } from './components/gt-datatable/gt-datatable.module';
import { GTPipesModule } from './pipes/gt-pipes.module';
import { GTConfirmationDialogModule } from './components/gt-confirmation-dialog/gt-confirmation-dialog.module';
import { IfCreatorOrTargetOrManagerDirective } from './directives/if-creator-or-target-or-manager.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AdminOnlyDirective,
    LoggedOnlyDirective,
    IfCreatorOrTargetOrManagerDirective,
  ],
  imports: [
    CommonModule,
    GTToolbarModule,
    GTFormsModule,
    GTDatatableModule,
    GTPipesModule,
    AgGridModule.withComponents([]),
    FormsModule,
    MaterialModule,
    HttpClientModule,
    NgxSpinnerModule,
    GTConfirmationDialogModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
    CommonModule,
    GTToolbarModule,
    GTFormsModule,
    GTDatatableModule,
    GTPipesModule,
    AgGridModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    NgxSpinnerModule,
    GTConfirmationDialogModule,
    ReactiveFormsModule,
    AdminOnlyDirective,
    LoggedOnlyDirective,
    IfCreatorOrTargetOrManagerDirective,
    FontAwesomeModule
  ],
})
export class SharedModule {}
