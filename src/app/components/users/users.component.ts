import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UsersService } from '../../services/users.service'
import { User } from '../../models/User'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private closeResult: string;
  private users: Observable<User[]>;
  private form: FormGroup;
  private modalRef: NgbModalRef;

  constructor(
              private usersService: UsersService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder
            ) {
    this.createForm();
  }

  ngOnInit() {
    this.users = this.usersService.getAllUsers();
  }

  /**
   * Create Form
   */
  createForm() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        this.validateName
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
        this.validateEmail
      ])],
    });
  }

  /**
   * Validate Name
   */
  validateName(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    if(regExp.test(controls.value)) {
      return null;
    } else {
      return {'validateName': true}
    }
  }

  /**
   * Validate email
   */
  validateEmail(controls) {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return {'validateEmail': true }
    }
  }

  /**
   * Add new user
   * @param event 
   */
  private addUser(event) {
    event.preventDefault();
    const user = {
      firstName: this.form.get('firstName').value,
      email: this.form.get('email').value,
    }
    this.usersService.addUser(user)
                     .then(() => this.modalRef.close())
                     .catch(err => console.log(err));
  }

  /**
   * Modal
   */
  private openModal(content) {
    this.modalRef = this.modalService.open(content);
  }
}