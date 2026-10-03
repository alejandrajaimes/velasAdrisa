import {
  ChangeDetectionStrategy,
  Component,
  input,
  viewChild
} from '@angular/core';

/**
 * Carrusel con scroll nativo (scroll-snap) y botones de
 * navegacion. Cero librerias externas: el deslizamiento con
 * el dedo es nativo y no secuestra el scroll vertical.
 *
 * Cada hijo con `scroll-snap-align: start` se ancla a la
 * izquierda del track. En escritorio se ven 4 items, en
 * tablet 3 y en movil ~1.1 (el borde de la siguiente tarjeta
 * invita a deslizar).
 */
@Component({
  selector: 'app-scroll-carrusel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="track" #track tabindex="0" [attr.aria-label]="ariaLabel()">
      <ng-content />
    </div>

    <div class="nav">
      <button
        type="button"
        class="nav__btn"
        aria-label="Ver elementos anteriores"
        (click)="mover(-1)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        class="nav__btn"
        aria-label="Ver elementos siguientes"
        (click)="mover(1)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  `,
  styles: `
    :host {
      position: relative;
      display: block;
    }

    .track {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: minmax(220px, 78vw);
      gap: clamp(0.75rem, 2vw, 1.25rem);
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      overscroll-behavior-inline: contain;
      // Se oculta la barra de scroll pero se conserva el gesto
      scrollbar-width: none;
      -ms-overflow-style: none;
      // Margen inferior para que la sombra de las tarjetas no
      // se recorte al hacer scroll
      padding-bottom: 0.35rem;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .track > * {
      scroll-snap-align: start;
      min-width: 0;
    }

    .nav {
      position: absolute;
      top: -4.25rem;
      right: 0;
      display: none;
      gap: 0.5rem;
    }

    .nav__btn {
      display: grid;
      place-items: center;
      width: 42px;
      height: 42px;
      border: 1px solid var(--borde);
      border-radius: 999px;
      background: var(--blanco);
      color: var(--azul-oscuro);
      cursor: pointer;
      transition: background-color 160ms ease, border-color 160ms ease,
        color 160ms ease;

      svg {
        width: 20px;
        height: 20px;
      }

      &:hover {
        background: var(--azul);
        border-color: var(--azul);
        color: #fff;
      }

      &:focus-visible {
        outline: 2px solid var(--dorado);
        outline-offset: 2px;
      }
    }

    // Tablet: 3 items visibles
    @media (min-width: 768px) {
      .track {
        grid-auto-columns: minmax(220px, calc((100% - 2 * clamp(0.75rem, 2vw, 1.25rem)) / 3));
      }
    }

    // Escritorio: 4 items visibles + botones
    @media (min-width: 992px) {
      .track {
        grid-auto-columns: minmax(240px, calc((100% - 3 * clamp(0.75rem, 2vw, 1.25rem)) / 4));
      }

      .nav {
        display: flex;
      }
    }
  `
})
export class ScrollCarruselComponent {
  readonly ariaLabel = input('Carrusel de productos');

  private readonly track = viewChild.required<HTMLElement>('track');

  mover(direccion: 1 | -1): void {
    const track = this.track();
    const primerItem = track.firstElementChild as HTMLElement | null;
    const paso = primerItem
      ? primerItem.getBoundingClientRect().width + 16
      : track.clientWidth * 0.8;
    track.scrollBy({ left: direccion * paso, behavior: 'smooth' });
  }
}
