import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';

/**
 * Marca de imagen degradada azul -> dorado con icono decorativo.
 * Se usa en lugar de <img> cuando no hay foto real disponible.
 * Cero bytes de red: todo es CSS.
 *
 * La prop `aspecto` define el ratio CSS del contenedor
 * (ej. '4 / 5', '1 / 1'), por defecto el de una tarjeta.
 */
@Component({
  selector: 'app-placeholder-img',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.aspect-ratio]': 'aspecto()'
  },
  template: `
    @if (alt(); as texto) {
      <span class="visually-hidden">{{ texto }}</span>
    }
    <svg
      class="ph"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true">
      <path d="M24 6c-3.3 0-6 2.7-6 6 0 2 .97 3.76 2.47 4.84" />
      <path d="M24 6c3.3 0 6 2.7 6 6 0 2-.97 3.76-2.47 4.84" />
      <path
        d="M18 16.84C16.3 18.12 14 20.4 14 24c0 5.52 4.48 10 10 10s10-4.48 10-10c0-3.6-2.3-5.88-4-7.16" />
      <path d="M24 34v6" />
      <path d="M17 40h14" />
      <circle cx="24" cy="24" r="3" />
    </svg>
  `,
  styles: `
    :host {
      position: relative;
      display: grid;
      place-items: center;
      width: 100%;
      overflow: hidden;
      border-radius: inherit;
      background-image: linear-gradient(
        135deg,
        var(--azul) 0%,
        var(--azul-profundo) 55%,
        var(--azul-oscuro) 100%
      );
      color: rgba(255, 255, 255, 0.5);
    }

    :host::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: radial-gradient(
        ellipse at 80% 20%,
        rgba(227, 200, 107, 0.22),
        transparent 55%
      );
      pointer-events: none;
    }

    .ph {
      width: 38%;
      max-width: 72px;
      height: auto;
    }
  `
})
export class PlaceholderImgComponent {
  readonly alt = input<string>('');
  readonly aspecto = input<string>('4 / 5');
}
