import { NgModule } from '@angular/core';

import { HomeModule } from './home/home.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { KanbanModule } from './kanban/kanban.module';
import { InboxModule } from './inbox/inbox.module';
import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';

@NgModule({
  imports: [
    LoginModule,
    SignupModule,
    HomeModule,
    TaskModule,
    UserModule,
    ProjectModule,
    KanbanModule,
    InboxModule,
    PageNotFoundModule,
  ],
  exports: [
    LoginModule,
    SignupModule,
    HomeModule,
    TaskModule,
    UserModule,
    ProjectModule,
    KanbanModule,
    InboxModule,
    PageNotFoundModule,
  ],
})
export class GTModule {}
