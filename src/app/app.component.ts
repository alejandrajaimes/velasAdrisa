import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  signal
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { IconSpriteComponent } from './shared/components/icon-sprite/icon-sprite.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { WhatsappFloatComponent } from './shared/components/whatsapp-float/whatsapp-float.component';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    IconSpriteComponent,
    HeaderComponent,
    FooterComponent,
    WhatsappFloatComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  /**
   * En el detalle de producto el boton flotante se oculta:
   * la pagina ya tiene su propio CTA sticky a WhatsApp y
   * mantener los dos duplicaria la accion en la misma zona.
   */
  protected readonly mostrarFloat = signal(true);

  constructor(
    router: Router,
    destroyRef: DestroyRef
  ) {
    router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(destroyRef)
      )
      .subscribe((e) => {
        this.mostrarFloat.set(!e.urlAfterRedirects.startsWith('/producto/'));
      });
  }
}
