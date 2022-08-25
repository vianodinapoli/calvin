import { Doar } from './../interfaces/doar';
import { DoarService } from './../services/doar.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Auth } from '@angular/fire/auth';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Firestore, collection, getDocs, docData, doc } from '@angular/fire/firestore';



@Component({
  selector: 'app-doar',
  templateUrl: './doar.page.html',
  styleUrls: ['./doar.page.scss'],
})
export class DoarPage implements OnInit {
  profile = null;
  credentials: FormGroup;




  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    // private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router,
    private doarService: DoarService,
    private firestore: Firestore,
    private auth: Auth
  ) {
    // this.doar.lerDoar().subscribe(data =>{
    //   this.profile = data;
    // });
    const user = this.auth.currentUser;

    // this.doar.lerDoar().subscribe(res =>{
    //   console.log('SEM ID',res);
    // })

    this.doarService.lerDoarById(user.uid).subscribe(res =>{
      console.log('COM ID',res);

    })
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

  ngOnInit() {
    this.credentials = this.fb.group({
      fullname: ['', Validators.required],
      bloodytype: ['', Validators.required],
      residence: ['', Validators.required],
    });
  }

  async addDoar(){
    const loading = await this.loadingCtrl.create();
    await loading.present();

    const user = this.auth.currentUser;
    const adoar = await this.doarService.addDoar(user.uid, this.credentials.value)
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
