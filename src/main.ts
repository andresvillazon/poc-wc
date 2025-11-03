// import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
// import { ApplicationRef } from '@angular/core';
// import { createCustomElement } from '@angular/elements';
// import { createApplication } from '@angular/platform-browser';
// import { provideRouter } from '@angular/router';

// import { bootstrapApplication } from "@angular/platform-browser";
// import { AppComponent } from "./app/app.component";
// import { appConfig } from "./app/app.config";

import { environment } from './environments/environment';
import { WebComponent } from './app/components/web-component/web-component';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationRef } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import('./bootstrap')
  .then(async () => {
    console.log('hola ')
    if (environment.NODE_ENV === 'production') {
      console.log('h2222la ')
      const appRef: ApplicationRef = await createApplication({
        providers: [
          provideHttpClient(),
          provideRouter([])
        ]
      });

      // Configuración opcional del servicio de traducción
      const poc = createCustomElement(WebComponent, {
        injector: appRef.injector
      });
      const wcName = 'wc-poc';

      if (!customElements.get(wcName)) {
        customElements.define(wcName, poc);
      }
    }
  })
  .catch(err => console.error(err));