import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { Producto } from '../../../core/models/producto';
import {
  TIPOS_VELA_POR_ID
} from '../../../core/data/tipos-vela';
import { enlaceWhatsAppProducto } from '../../../core/config/site.config';
import { PrecioPipe } from '../../../core/pipes/precio.pipe';
import { PlaceholderImgComponent } from '../placeholder-img/placeholder-img.component';

/**
 * Tarjeta de producto del catalogo.
 *
 * - Imagen real si `producto.imagenes` tiene rutas,
 *   placeholder degradado si no.
 * - Toda la tarjeta enlaza al detalle del producto.
 * - El boton "Consultar" abre WhatsApp con el mensaje
 *   del producto pre-cargado (no hay carrito).
 */
@Component({
  selector: 'app-product-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, PrecioPipe, PlaceholderImgComponent],
  template: `
    <article class="card">
      <a
        class="card__media"
        [routerLink]="['/producto', producto().id]"
        [attr.aria-label]="'Ver ' + producto().nombre">
        @if (producto().imagenes.length > 0) {
          <img
            [src]="producto().imagenes[0]"
            [alt]="producto().nombre"
            width="400"
            height="500"
            loading="lazy" />
        } @else {
          <app-placeholder-img [alt]="producto().nombre" aspecto="4 / 5" />
        }
        @if (etiqueta()) {
          <span class="card__badge">{{ etiqueta() }}</span>
        }
      </a>

      <div class="card__body">
        <span class="card__tipo">{{ tipoNombre() }}</span>

        <h3 class="card__nombre">
          <a [routerLink]="['/producto', producto().id]">
            {{ producto().nombre }}
          </a>
        </h3>

        <p class="card__meta">{{ producto().material }}</p>

        <p class="card__precio">
          <span class="card__precio-label">Desde</span>
          {{ producto().precio | precio }}
        </p>

        <a
          class="card__cta"
          [href]="enlace()"
          target="_blank"
          rel="noopener noreferrer">
          Consultar
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </article>
  `,
  styles: `
    .card {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
      background: var(--blanco);
      border: 1px solid var(--borde);
      border-radius: var(--radio-lg, 18px);
      box-shadow: 0 2px 8px rgba(42, 81, 100, 0.07);
      transition: transform 200ms ease, box-shadow 200ms ease;
    }

    .card:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 30px rgba(42, 81, 100, 0.12);
    }

    .card__media {
      position: relative;
      display: block;
      overflow: hidden;
      border-radius: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 400ms ease;
      }

      &:hover img {
        transform: scale(1.04);
      }
    }

    .card__badge {
      position: absolute;
      top: 0.75rem;
      left: 0.75rem;
      padding: 0.25rem 0.7rem;
      font-size: 0.6875rem;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--azul-profundo);
      background: var(--dorado);
      border-radius: var(--radio-pill, 999px);
    }

    .card__body {
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: 0.35rem;
      padding: 1.1rem 1.15rem 1.25rem;
    }

    .card__tipo {
      font-size: 0.6875rem;
      font-weight: 500;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--dorado);
    }

    .card__nombre {
      font-family: var(--serif, "Cormorant Garamond", Georgia, serif);
      font-size: 1.35rem;
      font-weight: 500;
      line-height: 1.15;

      a {
        color: var(--texto);
        transition: color 160ms ease;

        &:hover {
          color: var(--azul-oscuro);
        }
      }
    }

    .card__meta {
      font-size: 0.875rem;
      color: var(--texto-suave);
    }

    .card__precio {
      display: flex;
      align-items: baseline;
      gap: 0.4rem;
      margin-top: 0.25rem;
      font-size: 1.125rem;
      font-weight: 500;
      color: var(--dorado);
      letter-spacing: 0.02em;
    }

    .card__precio-label {
      font-size: 0.6875rem;
      font-weight: 400;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--texto-tenue);
    }

    .card__cta {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      margin-top: auto;
      padding-top: 0.85rem;
      min-height: 44px;
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--azul-oscuro);
      transition: color 160ms ease;

      svg {
        width: 16px;
        height: 16px;
        transition: transform 160ms ease;
      }

      &:hover {
        color: var(--dorado);

        svg {
          transform: translateX(3px);
        }
      }
    }
  `
})
export class ProductCardComponent {
  readonly producto = input.required<Producto>();

  protected readonly etiqueta = computed<string>(() => {
    if (!this.producto().stock) {
      return 'Proximamente';
    }
    if (this.producto().destacado) {
      return 'Destacado';
    }
    return '';
  });

  protected readonly tipoNombre = computed<string>(() => {
    const tipo = TIPOS_VELA_POR_ID.get(this.producto().tipo);
    return tipo ? tipo.nombre : '';
  });

  protected readonly enlace = computed<string>(() =>
    enlaceWhatsAppProducto(this.producto().nombre, this.producto().id)
  );
}
