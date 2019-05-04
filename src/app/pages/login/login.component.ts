import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';

import { SharedService } from 'src/app/core/services/shared.service';
import { CurrentUser } from 'src/app/shared/models/current.user';

import { AuthService } from "../../core/services/auth.service";
import { GladService } from "../../core/services/glad.service";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	email: string = '';
	senha: string = '';
	fromUrl: string;

	constructor(
		private authService: AuthService,
		private sharedService: SharedService,
		private gladService: GladService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private snackBar: MatSnackBar) {}

	ngOnInit(): void {
		this.activatedRoute.queryParams.subscribe(params => this.fromUrl = params['fromUrl']);
	}

	login(): void {
		this.authService.login(this.email, this.senha)
			.subscribe((authenticatedUser: CurrentUser) => {
				document.querySelector("#login-loading").classList.add("animation-active");
				this.saveUserOnShared(authenticatedUser);
				this.sharedService.userIsLoggedIn$.next(true);
				this.fromUrl ? this.router.navigateByUrl(this.fromUrl) : this.router.navigateByUrl("/");
			}, e => {
				this.openSnackBar("Login ou senha inválidos.", "Fechar");
				this.sharedService.user = null;
				this.sharedService.token = null;
				this.sharedService.userIsLoggedIn$.next(false);
			});
	}

	signup(): void {
		this.router.navigate(['/signup']);
	}

	saveUserOnShared(authUser: CurrentUser) {
		this.sharedService.saveUserOnLocalStorage(authUser);
	}

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 5000
		});
	}
}
