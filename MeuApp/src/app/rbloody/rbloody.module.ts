import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RbloodyPageRoutingModule } from './rbloody-routing.module';

import { RbloodyPage } from './rbloody.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RbloodyPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RbloodyPage]
})
export class RbloodyPageModule {}
