import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoarPageRoutingModule } from './doar-routing.module';

import { DoarPage } from './doar.page';
import { InputModule } from '../input/input.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DoarPage]
})
export class DoarPageModule {}
