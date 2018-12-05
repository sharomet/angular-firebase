import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { User } from '../models/User'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersCollection: AngularFirestoreCollection<User>;

  constructor(private db: AngularFirestore) {
    this.usersCollection = db.collection<User>('users');
  }

  getAllUsers() {
    return this.usersCollection.valueChanges();
  }

  addUser(user: User) {
    return this.usersCollection.add(user);
  }

}
