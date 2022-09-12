import { Doar } from './../interfaces/doar';
import { DoarService } from './../services/doar.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Auth } from '@angular/fire/auth';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Firestore, collection, getDocs, docData, doc } from '@angular/fire/firestore';
import { PerfilService } from '../services/perfil.service';



@Component({
  selector: 'app-doar',
  templateUrl: './doar.page.html',
  styleUrls: ['./doar.page.scss'],
})
export class DoarPage implements OnInit {
  profile = null;
  pro;
  today;
  credentials: FormGroup;




  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    private doarService: DoarService,
    private auth: Auth,
    private perfil: PerfilService
  ) {
    const user = this.auth.currentUser;

    this.doarService.lerDoarById(user.uid).subscribe(res =>{
      console.log('COM ID',res);

    });

      this.perfil.lerPerfilById(user.uid).subscribe((res) =>{
        this.profile = res;
        console.log('Variavel', this.profile);
        this.pro = this.profile;
        console.log(this.pro.fullname);

      });
  }


  get fullname(){
    return this.credentials.get('fullname');
  }

  get datarequi(){
    return this.credentials.get('datarequi');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      fullname: ['', Validators.required],
      datarequi: ['', Validators.required],
    });
    this.today = Date.now();
    console.log(this.today);

  }

  async addDoar(){
    const loading = await this.loadingCtrl.create();
    await loading.present();

    const user = this.auth.currentUser;
    const adoar = await this.doarService.addDoar(user.uid, this.credentials.value);
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
