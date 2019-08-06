import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Z_FULL_FLUSH } from 'zlib';

const routes: Routes = [
  { path:'', pathMatch:'full', redirectTo:'schedule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
