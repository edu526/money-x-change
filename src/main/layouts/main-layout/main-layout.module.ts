import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterModule } from '@mxc/components/footer';
import { HeaderModule } from '@mxc/components/header';
import { MainLayoutComponent } from './main-layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    FooterModule
  ],
  declarations: [MainLayoutComponent]
})
export class MainLayoutModule { }
