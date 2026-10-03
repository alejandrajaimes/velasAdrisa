import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  REDES,
  SITE_CONFIG,
  enlaceWhatsApp
} from '../../../core/config/site.config';

/**
 * Footer del sitio: logo blanco, navegacion, datos de
 * contacto por ciudad, redes y aviso legal.
 */
@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  protected readonly navItems = SITE_CONFIG.nav;
  protected readonly redes = REDES;
  protected readonly sucursales = SITE_CONFIG.sucursales;
  protected readonly email = SITE_CONFIG.email;
  protected readonly empresa = SITE_CONFIG.empresa;
  protected readonly nit = SITE_CONFIG.nit;
  protected readonly anio = new Date().getFullYear();
  protected readonly waLink = () => enlaceWhatsApp();
}
