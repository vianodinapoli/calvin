import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'
import { Auth } from '@angular/fire/auth';
import { DoarService } from './../services/doar.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //Para poder armazenar os dados que vem do FIreStore num array
  datas = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private doar: DoarService,
    private auth: Auth

    ) {
      const user = this.auth.currentUser;
      this.doar.lerDoarById(user.uid).subscribe((res) =>{
        console.log('COM ID',res);
        this.datas = res;
        console.log('Variavel', this.datas);
      })

    }

    async logout(){
      await this.authService.logout();
      this.router.navigateByUrl('/', { replaceUrl: true });
    }

}
