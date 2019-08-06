import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { AuthGuardService } from '../auth/shared/guards/auth-guard.service';


export const ROUTES:Routes =[
  {path:'meals',canActivate:[AuthGuardService],loadChildren:'./meals/meals.module#MealsModule'},
  {path:'schedule',canActivate:[AuthGuardService],loadChildren:'./schedule/schedule.module#ScheduleModule'},
  {path:'workouts',canActivate:[AuthGuardService],loadChildren:'./workouts/workouts.module#WorkoutsModule'},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES)
  ]
})
export class HealthModule { }
