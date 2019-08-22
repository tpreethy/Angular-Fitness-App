import { Component,Input,ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'list-item',
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  toggled = false;
  @Input() 
  item:any;

  @Output()
  remove = new EventEmitter<any>()

  constructor() { }

  getRoute(item:any){
    console.log(item);
    return [`../meals`,item.$key]
  }

  removeItem(){
    this.remove.emit(this.item);
  }

  toggle(){
    this.toggled =!this.toggled;
  }
  

}
