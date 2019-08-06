import { Component,OnInit,OnDestroy } from '@angular/core';
import { Store } from 'store';
import { AuthService, User } from './features/auth/shared/services/auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'myAngularFitnessApp';
  user$ : Observable<User>;
  subscription:Subscription;

  constructor(private store:Store,
              private authService:AuthService,
              private router:Router){}

  ngOnInit(){
     this.subscription = this.authService.auth$.subscribe();
     this.user$= this.store.select<User>('user');
  }  

  async onLogOut(){
    await this.authService.logoutUser();
    this.router.navigate(['auth/login']);
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
