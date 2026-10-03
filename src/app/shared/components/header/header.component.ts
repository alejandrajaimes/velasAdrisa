import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostListener,
  inject,
  signal
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import {
  REDES,
  SITE_CONFIG,
  enlaceWhatsApp
} from '../../../core/config/site.config';

/**
 * Header fijo del sitio.
 *
 * - Movil (base-md): logo + hamburguesa. El boton abre un
 *   drawer lateral con overlay, bloqueo de scroll, cierre con
 *   Esc o tocando fuera.
 * - lg en adelante: navegacion en linea con subrayado dorado
 *   y boton de WhatsApp. La hamburguesa se oculta.
 * - Gana fondo blanco translucido con sombra al hacer scroll.
 */
@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly destroyRef = inject(DestroyRef);

  protected readonly drawerAbierto = signal(false);
  protected readonly scrolled = signal(false);

  protected readonly navItems = SITE_CONFIG.nav;
  protected readonly redes = REDES;
  protected readonly waLink = () => enlaceWhatsApp();
  protected readonly sucursalPrincipal = () => SITE_CONFIG.sucursales[0];

  constructor() {
    this.destroyRef.onDestroy(() => this.bloquearScroll(false));
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.drawerAbierto()) {
      this.cerrarDrawer();
    }
  }

  alternarDrawer(): void {
    this.drawerAbierto() ? this.cerrarDrawer() : this.abrirDrawer();
  }

  abrirDrawer(): void {
    this.drawerAbierto.set(true);
    this.bloquearScroll(true);
  }

  cerrarDrawer(): void {
    this.drawerAbierto.set(false);
    this.bloquearScroll(false);
  }

  private bloquearScroll(bloquear: boolean): void {
    document.body.style.overflow = bloquear ? 'hidden' : '';
  }
}
