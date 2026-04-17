import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { definePreset, palette } from '@primeuix/themes';

import { routes } from './app.routes';

const ElmPreset = definePreset(Aura, {
  semantic: {
    primary: palette('#1b8354'),
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: ElmPreset,
        options: {
          darkModeSelector: false,
        },
      },
      ripple: true,
    }),
  ],
};
