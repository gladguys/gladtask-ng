import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../shared/models/user.model';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GTNotificationService } from '../../core/services/gt-notification.service';
import { UploadFileService } from '../../core/services/upload-file.service';
import { debounceTime, first, map, switchMap } from 'rxjs/operators';
import { UserService } from '../../core/services/user.service';
import { ProfileEnum } from 'src/app/shared/enums/profile-enum';
import { forkJoin } from 'rxjs';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  previewImage: any = '../../../assets/images/default-user.png';
  hidePassword = true;
  userForm: FormGroup;
  showLogoPhoto: boolean = true;
  teamId: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notificationService: GTNotificationService,
    private uploadFileService: UploadFileService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      username: [
        '',
        Validators.compose([Validators.required, Validators.minLength(4)]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      confirm_password: [
        '',
        Validators.compose([Validators.required, this.passwordConfirming]),
      ],
      profileEnum: [ProfileEnum.ROLE_CUSTOMER],
    });

    this.teamId = this.route.snapshot.params['teamId'];
    this.userForm.get('secondaryEmail').setValidators(Validators.email);
  }

  onSubmit() {
    this.validateEmailAndUsernameNotTaken().subscribe(([email, user]) => {
      if (email || user) {
        email && this.userForm.get('email').setErrors({emailTaken: true});
        user && this.userForm.get('username').setErrors({usernameTaken: true});

        return;
      }

      const submittedUser = this.userForm.getRawValue() as User;
      if (this.previewImage) {
        submittedUser.profilePhoto = this.previewImage;
      }
      this.userService
        .createOrUpdateWithTeam(submittedUser, this.teamId)
        .subscribe(
          (user) => {
            this.notificationService.notificateSuccess('Usuário criado');
            this.router.navigate(['/login']);
          },
          (e) =>
            this.notificationService.notificateFailure('Erro ao salvar usuário')
        );
    });
  }

  showPreviewImage(files) {
    if (files.length === 0) return;

    let mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => (this.previewImage = reader.result);
    this.showLogoPhoto = false;
  }

  passwordConfirming(c: AbstractControl): any {
    if (!c.parent || !c) return;
    const pwd = c.parent.get('password');
    const cpwd = c.parent.get('confirm_password');

    if (!pwd || !cpwd) return;
    if (pwd.value !== cpwd.value) {
      return { invalid: true };
    }
  }

  get password_confirm() {
    return this.userForm.get('confirm_password');
  }

  validateEmailAndUsernameNotTaken() {
    return forkJoin([
      this.userService.findByEmail(this.userForm.get('email').value),
      this.userService.findByUsername(this.userForm.get('username').value)
    ])
  }
}
