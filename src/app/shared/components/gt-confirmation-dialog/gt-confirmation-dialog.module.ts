import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { GTConfirmationDialogComponent } from './gt-confirmation-dialog.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [GTConfirmationDialogComponent],
  imports: [MaterialModule, FlexLayoutModule],
  exports: [GTConfirmationDialogComponent],
})
export class GTConfirmationDialogModule {}
