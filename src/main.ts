import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations'; // Import the provideAnimations function
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  ...appConfig, 
  providers: [
    provideAnimations(), 
    provideRouter(routes),
    provideHttpClient(), provideAnimationsAsync(),
  ]
})
  .catch((err) => console.error(err));
