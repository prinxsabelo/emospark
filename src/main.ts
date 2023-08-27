import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from 'src/environments/environment.development';
document.title = environment.title;
var link: any = document.querySelector("link[rel~='icon']");
if (link != null) {
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon'!;
    document.head.appendChild(link);
  }
  link.href = environment.faviconUrl;
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
