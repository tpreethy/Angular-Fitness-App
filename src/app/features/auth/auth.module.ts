import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes} from '@angular/router';
import { AngularFireModule, FirebaseAppConfig } from '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from'@angular/fire/database';
import { SharedModule } from './shared/shared.module';


export const ROUTES:Routes=[
  {
    path:'auth',
    children:[
      {path:'',pathMatch:'full',redirectTo:'login'},
      {path:'login',loadChildren:'./login/login.module#LoginModule'},
      {path:'register',loadChildren:'./register/register.module#RegisterModule'},

    ]
  }
]

export const config:FirebaseAppConfig={
    apiKey: "AIzaSyCF0GXxX_KfpAkVdlTQFvj5NCFXalbk6Bw",
    authDomain: "myfitnessapp-17.firebaseapp.com",
    databaseURL: "https://myfitnessapp-17.firebaseio.com",
    projectId: "myfitnessapp-17",
    storageBucket: "myfitnessapp-17.appspot.com",
    messagingSenderId: "285377684013",
    appId: "1:285377684013:web:37d966571cd1a7e8"
};


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    SharedModule.forRoot(),
  ]
})
export class AuthModule { }
