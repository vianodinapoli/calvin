import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'
import { Auth } from '@angular/fire/auth';
import { DoarService } from './../services/doar.service';
import { Firestore, collection, getDocs, docData, doc } from '@angular/fire/firestore';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    // private fb: FormBuilder,
    // private loadingCtrl: LoadingController,
    private authService: AuthService,
    // private alertCtrl: AlertController,
    private router: Router,
    private doar: DoarService,
    // private firestore: Firestore,
    private auth: Auth

    ) {
      const user = this.auth.currentUser;
      // this.doar.lerDoar().subscribe(res =>{
      //   // const user = this.auth.currentUser;

      //   // if(user.uid ==)
      //   console.log(res);
      // })

      this.doar.lerDoarById(user.uid).subscribe(res =>{
        console.log('COM ID',res);
      })
    }

    async logout(){
      await this.authService.logout();
      this.router.navigateByUrl('/', { replaceUrl: true });
    }

}
