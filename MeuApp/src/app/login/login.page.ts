import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router,

    ) { }

    // Easy acces to form fields
    get email(){
      return this.credentials.get('email');
    }

    get password(){
      return this.credentials.get('password');
    }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login(){
    const loading = await this.loadingCtrl.create();
    await loading.present();

    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();

    if(user){

      this.router.navigateByUrl('/home', { replaceUrl: true });

    }else{
      this.showAlert('Login falfou', 'Email ou Senha invalidos');
    }
  }

  async register(){
    this.router.navigateByUrl('/signup');
  }

  showAlert(header: string, message: string) {
    this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    }).then(alert => alert.present());
  }

}
