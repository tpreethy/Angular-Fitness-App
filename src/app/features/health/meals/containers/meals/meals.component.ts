import { Component, OnInit } from '@angular/core';
import { MealsService, Meal } from '../../../shared/services/meals/meals.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from 'store';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit {
  meals$:Observable<Meal[]>;
  subscription:Subscription

  constructor(private mealsService:MealsService,
    private store:Store) { }

  ngOnInit() {
    this.meals$ = this.store.select<Meal[]>('meals')
    this.subscription = this.mealsService.meals$.subscribe();
  }
  

  ngOnDestory(){
    this.subscription.unsubscribe();
  }
}
