import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Category } from '../models/Category'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categoryCollection: AngularFirestoreCollection<Category>;

  constructor(private db: AngularFirestore) {
    this.categoryCollection = db.collection<Category>('categories');
  }

  getAllCategories() {
    return this.categoryCollection.valueChanges();
    /*return this.categoryCollection.snapshotChanges().subscribe(docs => {
      return docs.forEach(doc => {
        const id = doc.payload.doc.id;
        const data = doc.payload.doc.data();
        return { id, data }
      });
    });*/
  }

}
