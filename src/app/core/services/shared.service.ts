import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

import { User } from '../../shared/models/user.model';
import { CurrentUser } from '../../shared/models/current.user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

	user: User;
	token: string;
	userIsLoggedIn$ = new BehaviorSubject<boolean>(null);
	titleNameMenu$ = new BehaviorSubject<string>("Gladtask");

	constructor() {
		this.isUserInLocalStorage() && this.notifyUserIsLoggedIn();
	}

	isUserLoggedIn(): boolean {
		return this.userIsLoggedIn$.getValue();
	}

	getTitleNameMenu() : Observable<string> {
		return this.titleNameMenu$.asObservable();
	}

	isUserInLocalStorage(): boolean {
		return JSON.parse(window.localStorage.getItem('gt-user'));
	}

	notifyUserIsLoggedIn(): void {
		this.userIsLoggedIn$.next(true);
	}

	getUserLogged(): User {
		let user: CurrentUser = JSON.parse(window.localStorage.getItem('gt-user'));
		return user != null ? user.user : null;
	}

	static getToken() {
		let user: CurrentUser = JSON.parse(window.localStorage.getItem('gt-user'));
		return user.token;
	}

	saveUserOnLocalStorage(authUser: CurrentUser) {
		this.notifyUserIsLoggedIn();
		window.localStorage.setItem('gt-user',JSON.stringify(authUser));
	}

	logout() {
		window.localStorage.removeItem('gt-user');
		this.userIsLoggedIn$.next(false);
	}

	setTitleMenu(title:string) {
		this.titleNameMenu$.next(title);
	}
}
