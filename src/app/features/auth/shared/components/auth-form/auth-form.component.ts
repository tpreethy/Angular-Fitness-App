import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {

  @Output()
  submitted = new EventEmitter<FormGroup>();
  form = this.fb.group({
    email:['',Validators.email],
    password:['',Validators.required]
  })

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
   
  }
  
  onSubmit(){
    if(this.form.valid){
      this.submitted.emit(this.form);
    }
  }

  get PasswordInvalid(){
    const control = this.form.get('password');
    return control.hasError('required') && control.touched;
  }

  get emailFormat(){
    const control = this.form.get('email');
    return control.hasError('email') && control.touched;
  }
}
