import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CoreModule, SharedModule],
})
export class LoginModule {}
