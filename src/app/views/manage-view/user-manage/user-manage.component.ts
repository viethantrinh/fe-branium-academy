import {Component, computed, ElementRef, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {inmemoryUserData, Role, User, UserForm} from '../../../models/user.model';
import {ROLES} from '../../../utils/constants/authority-constants';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {genderValues} from '../../../utils/constants/form-constants';

@Component({
  selector: 'ba-user-manage',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './user-manage.component.html',
  styleUrl: './user-manage.component.scss'
})
export class UserManageComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly formBuilder = inject(FormBuilder);
  protected readonly ROLES = ROLES;
  protected readonly genderValues = genderValues;
  protected isCreate = true;
  protected users = computed<User[]>(() => this.userService.users() ?? []);
  @ViewChild('avatarEl') protected avatarEl!: ElementRef<HTMLImageElement>;
  @ViewChild('inputAvatarEl') protected inputAvatarEl!: ElementRef<HTMLInputElement>;

  protected userForm = this.formBuilder.nonNullable.group({
    id: '',
    username: <string | null>null,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    enabled: false,
    gender: <boolean | null>null,
    birthDate: <string | null>null,
    vipLevel: 0,
    phoneNumber: <string | null>null,
    roles: this.formBuilder.nonNullable.group({
      admin: false,
      customer: true,
      student: false,
      instructor: false,
    }),
  })


  ngOnInit(): void {
    this.userService.getUsersData().subscribe();
  }

  /**
   * Extract the role of each user to show on the table data
   * @param roles roles of user
   */
  public extractUserRoles(roles: Role[]) {
    const listOfRoles: string[] = [];
    roles.forEach((role) => {
      listOfRoles.push(role.name);
    })
    return listOfRoles;
  }

  onCreateAndUpdateUser() {
    // extract the checked roles and put it into Role[] arrays
    function extractRole(role: any) {
      const extractedRoles: Role[] = [];
      if (role.admin) {
        extractedRoles.push({name: ROLES.ROLE_ADMIN});
      }
      if (role.customer) {
        extractedRoles.push({name: ROLES.ROLE_CUSTOMER});
      }
      if (role.instructor) {
        extractedRoles.push({name: ROLES.ROLE_INSTRUCTOR});
      }
      if (role.student) {
        extractedRoles.push({name: ROLES.ROLE_STUDENT});
      }
      return extractedRoles;
    }

    const roles = extractRole(this.userForm.value.roles);
    const userData = {...this.userForm.getRawValue(), roles: roles} as UserForm;
    // send data to server to create user and update user image
    const avatarFile = this.inputAvatarEl.nativeElement.files?.item(0);
    if (this.isCreate) {
      this.userService.createUser(userData, avatarFile).subscribe()
    } else {
      const currentAvatar = this.avatarEl.nativeElement.src;
      this.userService.updateUser(userData, avatarFile, currentAvatar).subscribe();
    }
  }


  /**
   * Change the avatar when upload the image
   * @param event the event occur when upload the image to create form
   */
  onUploadAvatarChange(event: Event) {
    const inputAvatarEl = event.target as HTMLInputElement;
    if (inputAvatarEl.files) {
      this.avatarEl.nativeElement.src = URL.createObjectURL(inputAvatarEl.files[0]);
    }
  }

  onDeleteUser(id: string) {
    this.userService.deleteUser(id).subscribe();
  }

  enableCreateForm() {
    if (!this.isCreate) this.isCreate = !this.isCreate
    if (this.avatarEl.nativeElement.src.length !== 0) {
      this.avatarEl.nativeElement.src = 'assets/images/user-avatar-placeholder.png';
    }
    this.userForm.reset();
  }

  enableUpdateForm(user: User) {
    if (this.isCreate) this.isCreate = !this.isCreate;

    const userFormObject = {
      id: user.id,
      username: user.username,
      email: user.email,
      password: '',
      firstName: user.firstName,
      lastName: user.lastName,
      enabled: user.enabled,
      gender: user.gender,
      birthDate: user.birthDate,
      vipLevel: user.vipLevel,
      phoneNumber: user.phoneNumber,
      roles: {
        admin: false,
        customer: false,
        instructor: false,
        student: false
      }
    }

    // bind the role to the form data model
    const keys = Object.keys(userFormObject.roles);
    for (let key of keys) {
      let roleTitle = key as keyof typeof userFormObject.roles;
      const keyUppercase = key.toUpperCase();
      if (user.roles.some((role) => role.name === keyUppercase)) {
        userFormObject.roles[roleTitle] = true;
      }
    }

    // set avatar for user
    if (user.avatar) {
      this.avatarEl.nativeElement.src = user.avatar;
    }

    this.userForm.controls.id.disable()
    this.userForm.setValue(userFormObject);
  }
}
