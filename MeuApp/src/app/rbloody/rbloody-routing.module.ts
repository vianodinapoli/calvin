import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RbloodyPage } from './rbloody.page';

const routes: Routes = [
  {
    path: '',
    component: RbloodyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RbloodyPageRoutingModule {}
