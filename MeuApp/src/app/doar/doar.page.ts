import { Doar } from './../interfaces/doar';
import { DoarService } from './../services/doar.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-doar',
  templateUrl: './doar.page.html',
  styleUrls: ['./doar.page.scss'],
})
export class DoarPage implements OnInit {
  profile = null;


  constructor(
    private authService: AuthService,
    private doar: DoarService
  ) {
    // this.doar.lerDoar().subscribe(data =>{
    //   this.profile = data;
    // });
  }

  ngOnInit() {
  }

}
