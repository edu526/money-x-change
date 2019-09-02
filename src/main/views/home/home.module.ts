import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '@mxc-ui/lib/components';
import { ClearCurrencyPipeModule } from '@mxc-ui/lib/pipes/clear-currency.pipe';
import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routing';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutes,
    InputModule,
    ReactiveFormsModule,
    ClearCurrencyPipeModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
