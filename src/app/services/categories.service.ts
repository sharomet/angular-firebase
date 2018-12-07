import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Category } from '../models/Category'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categoryCollection: AngularFirestoreCollection<Category>;

  constructor(private db: AngularFirestore) {
    this.categoryCollection = db.collection<Category>('categories');
  }

  getAllCategories(): Observable<any> {
    return this.categoryCollection.snapshotChanges().pipe(
      map((categories) => {
        return categories.map(category => {
          let data = category.payload.doc;
          return {
            id: data.id,
            name: data.data().name,
            description: data.data().description
          };
        })
      }),
      catchError(this.handleError<Category>('Error'))
    );
    //return this.categoryCollection.valueChanges();
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
