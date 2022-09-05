import { Component, OnInit } from '@angular/core';

import { Auth } from '@angular/fire/auth';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { RbloodyService } from '../services/rbloody.service';

@Component({
  selector: 'app-rbloody',
  templateUrl: './rbloody.page.html',
  styleUrls: ['./rbloody.page.scss'],
})
export class RbloodyPage implements OnInit {

  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    private doarService: RbloodyService,
    private auth: Auth

  ) {
    const user = this.auth.currentUser;

    this.doarService.lerDadosById(user.uid).subscribe(res =>{
      console.log('COM ID',res);

    });
  }

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

  async addDados(){
    const loading = await this.loadingCtrl.create();
    await loading.present();

    const user = this.auth.currentUser;
    const adoar = await this.doarService.addDados(user.uid, this.credentials.value);
    await loading.dismiss();

    if(user){

      this.router.navigateByUrl('/home', { replaceUrl: true });

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
