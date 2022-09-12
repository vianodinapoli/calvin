import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'
import { Auth } from '@angular/fire/auth';
import { DoarService } from './../services/doar.service';
import { RbloodyService } from '../services/rbloody.service';
import { PerfilService } from '../services/perfil.service';
import * as moment from "moment";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //Para poder armazenar os dados que vem do FIreStore num array
  datas = null;
  perfi = null;
  rdatas = null;
  residences;
  currDate:any;
  ver: boolean = false;
  ver1: boolean = false;


  constructor(

    private loadingCtrl: LoadingController,
    private perfil: PerfilService,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private router: Router,
    private doar: DoarService,
    private requerer: RbloodyService,
    private auth: Auth

    ) {
      const user = this.auth.currentUser;
      this.doar.lerDoarById(user.uid).subscribe((res) =>{
        this.datas = res;
        // console.log('Requisicao de Doacao', this.datas);
        if(res!=null) this.ver = true
      })

      this.requerer.lerDadosById(user.uid).subscribe((res) =>{
        this.rdatas = res;
        // console.log('Requisicao de Pedido de doacao', this.rdatas);
        if(res!=null) this.ver1 = true
      })

      this.perfil.lerPerfilById(user.uid).subscribe((res) =>{
        this.perfi = res;
        // console.log('perfil', this.perfi);
        this.residences = this.perfi;
      });

    }

    async logout(){
      await this.authService.logout();
      this.router.navigateByUrl('/', { replaceUrl: true });
    }

    async addRequiDoa(){

      var today = new Date();
      const loading = await this.loadingCtrl.create();
      await loading.present();

      const user = this.auth.currentUser;
      const adoar = await this.doar.addDoar(user.uid, {
        fullname: this.residences.fullname,
        datarequi: moment(today).format("DD-MM-YYYY")
      });
      await loading.dismiss();


    }

    async addRequiPedi(){
      var today = new Date();
      let array: Array<string> = [
        this.residences.fullname,
        moment(today).format("DD-MM-YYYY")

      ]

      const loading = await this.loadingCtrl.create();
      await loading.present();

      const user = this.auth.currentUser;
      const adoar = await this.requerer.addDados(user.uid, {
        fullname: this.residences.fullname,
        datarequi: moment(today).format("DD-MM-YYYY")
      });
      await loading.dismiss();

    }

    async deleteRBloody(id) {
      console.log(id)
      const user = this.auth.currentUser;
      await this.requerer.deleteRBloody(user.uid);
      window.location.reload();
    }

    async deleteDoar(id) {
      console.log(id)
      const user = this.auth.currentUser;
      await this.doar.deleteDoar(user.uid);
      window.location.reload();
    }

}
