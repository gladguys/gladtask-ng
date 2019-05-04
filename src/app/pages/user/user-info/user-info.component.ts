import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

import { UserService } from "../../../core/services/user.service";
import { User } from "../../../shared/models/user.model";

@Component({
	templateUrl: './user-info.component.html',
	styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

	user$: Observable<User>;

	constructor(
		private route: ActivatedRoute,
		private userService: UserService) {}

	ngOnInit(): void {
		let id: string = this.route.snapshot.params['id'];
		this.user$ = this.userService.findById(id);
	}
}
