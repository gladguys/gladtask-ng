import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { GTCircleIconComponent } from './gt-circle-icon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

@NgModule({
  declarations: [GTCircleIconComponent],
  imports: [MaterialModule, FlexLayoutModule, FontAwesomeModule],
  exports: [GTCircleIconComponent],
})
export class GTCircleIconModule {
  constructor() {
    library.add(faCircle);
  }
}
