import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }
  email: string='';
  password: string='';

  login(){

    if(this.email == 'adilsonsup@gmail.com' && this.password == '123'){
      console.log(this.email);
      console.log(this.password);
      // Go to home page
      this.router.navigate(['/home'])



    }
    else{
      console.log('Login Failed');
    }
  }

  ngOnInit() {
  }

}
