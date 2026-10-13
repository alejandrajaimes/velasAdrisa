import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { Producto } from '../../../core/models/producto';
import { PrecioPipe } from '../../../core/pipes/precio.pipe';
import { PlaceholderImgComponent } from '../placeholder-img/placeholder-img.component';

/**
 * Tarjeta de producto del catalogo.
 *
 * - Foto con nombre y precio debajo.
 * - Icono de ojo sobre la imagen: siempre visible en
 *   movil, aparece al hover en escritorio.
 * - La imagen y el nombre enlanzan al detalle.
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

        <span class="card__ojo" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </span>
      </a>

      <div class="card__body">
        <h3 class="card__nombre">
          <a [routerLink]="['/producto', producto().id]">
            {{ producto().nombre }}
          </a>
        </h3>

        <p class="card__precio">
          {{ producto().precio | precio }}
        </p>
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
      z-index: 1;
      padding: 0.25rem 0.7rem;
      font-size: 0.6875rem;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--azul-profundo);
      background: var(--dorado);
      border-radius: var(--radio-pill, 999px);
    }

    .card__ojo {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      background: rgba(31, 45, 51, 0.28);
      opacity: 1;
      transition: opacity 200ms ease;

      svg {
        width: 36px;
        height: 36px;
        color: #fff;
        filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3));
      }
    }

    .card__body {
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: 0.3rem;
      padding: 1rem 1.1rem 1.15rem;
    }

    .card__nombre {
      font-family: var(--serif, 'Cormorant Garamond', Georgia, serif);
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

    .card__precio {
      margin-top: auto;
      font-size: 1.125rem;
      font-weight: 500;
      color: var(--dorado);
      letter-spacing: 0.02em;
    }

    @media (hover: hover) and (pointer: fine) {
      .card__ojo {
        opacity: 0;
      }

      .card__media:hover .card__ojo,
      .card__media:focus-visible .card__ojo {
        opacity: 1;
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
}
