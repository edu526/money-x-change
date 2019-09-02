import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApiModule } from '@mxc-shared/public-api';
import { AuthenticationModule } from '@mxc/interceptors/authentication';
import { MainLayoutModule } from '@mxc/layouts';
import { RoutesModule } from '@mxc/routes';
import { StateModule } from 'src/state/state.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RoutesModule,
    HttpClientModule,
    MainLayoutModule,
    ApiModule,
    AuthenticationModule,
    StateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
