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
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router,
    private doar: DoarService,
    private firestore: Firestore,
    private auth: Auth
  ) {
    // this.doar.lerDoar().subscribe(data =>{
    //   this.profile = data;
    // });
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
    const user = this.auth.currentUser;
    // console.log('Credentials', this.credentials.value, 'Logged User Id',user.uid);
    // try {
    //   const docRef = doc(this.firestore, 'Doar', 'Doar/${user}').doc(user.uid).set(this.credentials);
    // //   return collection(docRef);
    //   // const docSnap = await getDocs(docRef);
    //   await this.firestore.collection('Doar').doc(user.uid).set(this.credentials);

    // } catch (error) {
    //   console.error(error);

    // }

  }

}
