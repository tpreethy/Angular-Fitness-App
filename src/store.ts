import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, pluck} from 'rxjs/operators';
import { User } from './app/features/auth/shared/services/auth/auth.service';
import { Meal } from './app/features/health/shared/services/meals/meals.service';

export interface State {
    user:User,
    meals:Meal[],
   [key: string]: any
}

const state: State = {
    user:undefined,
    meals:undefined,
};

export class Store {

  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    console.log(name);
    return this.store.pipe(pluck(name));
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }

}