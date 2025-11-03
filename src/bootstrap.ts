/// <reference types="@angular/localize" />
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';
console.log('09')
if (environment.NODE_ENV !== 'production') {
    bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));
}else{
    console.log('10')
    enableProdMode();
}
