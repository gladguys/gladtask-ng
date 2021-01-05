import { NgModule } from '@angular/core';

import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GTUserLoggedInfoComponent } from './gt-user-logged-info.component';
import { RouterModule } from '@angular/router';
import { GTPipesModule } from '../../pipes/gt-pipes.module';

@NgModule({
  declarations: [GTUserLoggedInfoComponent],
  imports: [MaterialModule, FlexLayoutModule, RouterModule, GTPipesModule],
  exports: [GTUserLoggedInfoComponent],
})
export class GTUserLoggedInfoModule {}
