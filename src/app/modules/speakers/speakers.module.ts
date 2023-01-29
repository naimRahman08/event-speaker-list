import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeakersRoutingModule } from './speakers-routing.module';
import { ListComponent } from './pages/list/list.component';
import { DetailComponent } from './pages/detail/detail.component';


@NgModule({
  declarations: [
    ListComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    SpeakersRoutingModule
  ]
})
export class SpeakersModule { }
