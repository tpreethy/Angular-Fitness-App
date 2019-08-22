import { Injectable } from '@angular/core';
import { Store } from 'store';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthService } from 'src/app/features/auth/shared/services/auth/auth.service';
import { tap,filter, map } from 'rxjs/operators'
import { Observable, of } from 'rxjs';


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

  // meals$:Observable<Meal[]>=this.db.list<Meal>(`meals/${this.uid}`)
  //    .valueChanges().pipe(
  //      tap(next => this.store.set('meals',next)))

  meals$: Observable<Meal[]> = this.db.list<Meal>(`meals/${this.uid}`).snapshotChanges()
    .pipe(
        map(meals => 
            meals.map(meal => ({ $key: meal.key, ...meal.payload.val() }))
        ),
        tap(meals => this.store.set('meals', meals))
    );

  constructor(private store:Store,
    private db:AngularFireDatabase,
    private authService:AuthService) { }

  get uid(){
    return this.authService.user.uid;
  }  

  addMeal(meal:Meal){
    return this.db.list(`meals/${this.uid}`).push(meal);
  }

  updateMeal(key: string, meal: Meal) {
    return this.db.object(`meals/${this.uid}/${key}`).update(meal);
  }
  
  getMeal(key:string){
    if (!key) return of({});
    console.log(this.store.select<Meal[]>('meals'));
    return this.store.select<Meal[]>('meals').pipe(
      filter(Boolean),map(meals => meals.find((meal: Meal) => meal.$key === key)));
  }

  removeMeal(key:string){
    return this.db.list(`meals/${this.uid}`).remove(key);
  }
}
