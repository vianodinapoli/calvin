import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Auth } from '@angular/fire/auth';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { PerfilService } from '../services/perfil.service'

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  profile = null;
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    private perfilService: PerfilService,
    private auth: Auth
  ) { }

  get fullname(){
    return this.credentials.get('fullname');
  }

  get bloodytype(){
    return this.credentials.get('bloodytype');
  }

  get residence(){
    return this.credentials.get('residence');
  }

  get contact(){
    return this.credentials.get('contact');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      fullname: ['', Validators.required],
      bloodytype: ['', Validators.required],
      residence: ['', Validators.required],
      contact: ['', Validators.required],
    });
  }

  async addPerfil(){
    const loading = await this.loadingCtrl.create();
    await loading.present();

    const user = this.auth.currentUser;
    const adoar = await this.perfilService.addPerfil(user.uid, this.credentials.value);
    await loading.dismiss();

    if(user){

      this.router.navigateByUrl('/perfil', { replaceUrl: true });

    }else{
      this.showAlert('A submissao falhou', 'Talvez ja tenhas uma submissao enviada');
    }

  }


  showAlert(header: string, message: string) {
    this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    }).then(alert => alert.present());
  }

}
