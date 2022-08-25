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
    // private loadingCtrl: LoadingController,
    // private authService: AuthService,
    // private alertCtrl: AlertController,
    // private router: Router,
    private doar: DoarService,
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

    this.doar.lerDoarById(user.uid).subscribe(res =>{
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

  }

}
