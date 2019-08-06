import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router,CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService:AuthService,
             private router:Router) { }

  canActivate(){
    return this.authService.authState.pipe(map((user) =>{
      if(!user){
        this.router.navigate(['/auth/login'])
      }
      return !!user;
    }))
  }         
}
