import { Component, OnInit,OnDestroy } from '@angular/core';
import { Meal, MealsService } from '../../../shared/services/meals/meals.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit,OnDestroy {
  meal$:Observable<Meal>;
  subscription:Subscription;

  constructor(private mealsService:MealsService,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.mealsService.meals$.subscribe();
    
    this.meal$ = this.route.params.pipe(switchMap(param =>{
       return this.mealsService.getMeal(param.id);
    }))
  }

  async addMeal(event:Meal){
    await this.mealsService.addMeal(event);
    this.backToMeals();

  }

  async updateMeal(event: Meal) {
    const key = this.route.snapshot.params.id;
    await this.mealsService.updateMeal(key, event);
    this.backToMeals();
  }

  async removeMeal(event: Meal) {
    const key = this.route.snapshot.params.id;
    await this.mealsService.removeMeal(key);
    this.backToMeals();
  }

  backToMeals(){
    this.router.navigate(['meals']);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
