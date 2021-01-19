import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { GTCircleIconComponent } from './gt-circle-icon.component';

@NgModule({
  declarations: [GTCircleIconComponent],
  imports: [MaterialModule, FlexLayoutModule],
  exports: [GTCircleIconComponent],
})
export class GTCircleIconModule {}
