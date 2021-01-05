import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ClickOutsideModule } from 'ng-click-outside';

import { GTToolbarComponent } from './gt-toolbar.component';
import { GTSearchComponent } from './gt-search/gt-search.component';
import { MaterialModule } from '../material/material.module';
import { GTUserLoggedInfoModule } from '../gt-user-logged-info/gt-user-logged-info.module';
import { GTPipesModule } from '../../pipes/gt-pipes.module';

@NgModule({
  declarations: [GTToolbarComponent, GTSearchComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    SatPopoverModule,
    RouterModule,
    GTUserLoggedInfoModule,
    GTPipesModule,
    ClickOutsideModule,
    FontAwesomeModule,
  ],
  exports: [GTToolbarComponent, MaterialModule],
})
export class GTToolbarModule {
  constructor() {
    library.add(faBars, faSearch, faTimes);
  }
}
