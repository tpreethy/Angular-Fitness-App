import { Injectable } from '@angular/core';
import { Store } from 'store';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthService } from 'src/app/features/auth/shared/services/auth/auth.service';
import { tap } from 'rxjs/operators'
import { Observable } from 'rxjs';



export interface Meal{
  name:string,
  ingredients:string[],
  timestamp:number,
  $key:string,
  $exists:() => boolean
}

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  meals$:Observable<Meal[]>=this.db.list<Meal>(`meals/${this.uid}`)
     .valueChanges().pipe(
       tap(next => this.store.set('meals',next)))

  constructor(private store:Store,
    private db:AngularFireDatabase,
    private authService:AuthService) { }

  get uid(){
    return this.authService.user.uid;
  }  
}
