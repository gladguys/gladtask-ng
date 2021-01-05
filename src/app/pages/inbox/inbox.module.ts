import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material';
import { NgSelectModule } from '@ng-select/ng-select';

import { InboxComponent, DialogJustMockup } from './inbox.component';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [InboxComponent, DialogJustMockup],
  imports: [
    NgSelectModule,
    MatGridListModule,
    FlexLayoutModule,
    CoreModule,
    SharedModule,
  ],
  exports: [InboxComponent, DialogJustMockup],
  entryComponents: [DialogJustMockup],
})
export class InboxModule {}
