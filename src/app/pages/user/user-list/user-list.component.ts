import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../../core/services/user.service';
import { User } from '../../../shared/models/user.model';
import { GTNotificationService } from '../../../core/services/gt-notification.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  displayedColumns = ['username', 'email', 'profileEnum'];
  columnDefinitions = [
    { title: 'Username', name: 'username' },
    { title: 'Nome', name: 'firstName' },
    { Title: 'Sobrenome', name: 'lastName' },
    { title: 'Email', name: 'email' },
    { title: 'Profile', name: 'profileEnum' },
  ];
  data: User[];

  constructor(
    private userService: UserService,
    private notificationService: GTNotificationService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.data = this.activateRoute.snapshot.data['users'].content;
  }

  remove(id: string): void {
    this.userService.delete(id).subscribe(
      () => {
        this.notificationService.notificateSuccess('Usuário removido');
        this.data = this.data.filter((user) => user._id != id);
      },
      (e) =>
        this.notificationService.notificateFailure('Falha ao remover usuário')
    );
  }
}
