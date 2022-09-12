import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'
import { Auth } from '@angular/fire/auth';
import { Dados, PerfilService } from './../services/perfil.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  datas = null;

  @Input() id: string;
  dados: Dados = null;

  ver: boolean = false;
  isModalOpen = false;
  credentials: FormGroup;
  residences;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private perfil: PerfilService,
    private auth: Auth
  ) {
      const user = this.auth.currentUser;

      this.perfil.lerPerfilById(user.uid).subscribe((res) =>{
        this.datas = res;
        console.log('Variavel', this.datas);
        this.residences = this.datas;

        if(res!=null) this.ver = true
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

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      fullname: ['', Validators.required],
      bloodytype: ['', Validators.required],
      residence: ['', Validators.required],
      contact: ['', Validators.required],
    });

    this.perfil.lerPerfilById(this.id).subscribe(res => {
      this.dados = res;
      console.log('DADOS AO EDITAR', this.dados)
    });
  }


  async updatePerfil(id) {
    const user = this.auth.currentUser;
    await this.perfil.updatePerfil(user.uid, this.credentials.value);

  }
}
