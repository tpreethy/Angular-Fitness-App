import { NgModule,ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MealsService } from './services/meals/meals.service';
import { ListItemComponent } from './components/list-item/list-item.component'

@NgModule({
  declarations: [ListItemComponent],
  imports: [
    CommonModule,
    RouterModule,
    AngularFireDatabaseModule
  ],
  exports:[ListItemComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule : SharedModule,
      providers: [MealsService]
    }
  }
  
}
