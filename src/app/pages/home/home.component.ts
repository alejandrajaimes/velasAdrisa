import {
  ChangeDetectionStrategy,
  Component,
  computed
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { TIPOS_VELA } from '../../core/data/tipos-vela';
import {
  PRODUCTOS_DESTACADOS
} from '../../core/data/productos';
import { enlaceWhatsApp } from '../../core/config/site.config';
import {
  SectionHeadingComponent
} from '../../shared/components/section-heading/section-heading.component';
import {
  ScrollCarruselComponent
} from '../../shared/components/scroll-carrusel/scroll-carrusel.component';
import {
  ProductCardComponent
} from '../../shared/components/product-card/product-card.component';
import {
  PlaceholderImgComponent
} from '../../shared/components/placeholder-img/placeholder-img.component';
import {
  NewsletterComponent
} from '../../shared/components/newsletter/newsletter.component';

/**
 * Home: portada del sitio.
 *
 * Mobile-first. Las secciones se apilan en celular y
 * pasan a dos o cuatro columnas solo en pantallas
 * grandes.
 */
@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    SectionHeadingComponent,
    ScrollCarruselComponent,
    ProductCardComponent,
    PlaceholderImgComponent,
    NewsletterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected readonly tipos = TIPOS_VELA;
  protected readonly destacados = PRODUCTOS_DESTACADOS;
  protected readonly hayDestacados = computed(
    () => this.destacados.length > 0
  );
  protected readonly waLink = () => enlaceWhatsApp();
  protected readonly anio = new Date().getFullYear();
}
