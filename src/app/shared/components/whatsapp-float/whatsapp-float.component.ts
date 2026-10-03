import { ChangeDetectionStrategy, Component } from '@angular/core';

import { enlaceWhatsApp } from '../../../core/config/site.config';

/**
 * Boton flotante de WhatsApp.
 *
 * Fijo abajo a la derecha, con safe-area para no quedar
 * bajo la barra de gestos del iPhone. El padding inferior
 * de <main> ya esta calculado para que nunca tape el ultimo
 * contenido de la pagina.
 *
 * Las redes sociales viven en el footer, no aqui.
 */
@Component({
  selector: 'app-whatsapp-float',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      class="float__wa"
      [href]="waLink()"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir a Adrisa por WhatsApp">
      <span class="float__etiqueta">¿Necesitas ayuda?</span>
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <use href="#icon-wa" />
      </svg>
    </a>
  `,
  styles: [
    `
      :host {
        display: block;
        position: fixed;
        // Abajo a la derecha, por encima de todo el contenido
        inset-block-end: max(1rem, env(safe-area-inset-bottom, 0px));
        inset-inline-end: max(1rem, env(safe-area-inset-right, 0px));
        z-index: var(--z-float);
      }

      .float__wa {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        min-height: 56px;
        padding: 0 1.1rem;
        border-radius: var(--radio-pill);
        color: #fff;
        // Degradado azul -> dorado: el lenguaje visual de la marca
        background-image: linear-gradient(
          135deg,
          var(--azul) 0%,
          var(--azul-profundo) 60%,
          var(--dorado) 165%
        );
        box-shadow: 0 10px 30px rgba(42, 81, 100, 0.35);
        text-decoration: none;
        transition: transform 200ms ease, box-shadow 200ms ease;

        svg {
          width: 26px;
          height: 26px;
          flex: none;
        }

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 40px rgba(42, 81, 100, 0.42);
        }

        &:active {
          transform: translateY(0);
        }

        &:focus-visible {
          outline: 2px solid var(--dorado);
          outline-offset: 3px;
        }
      }

      .float__etiqueta {
        display: none;
        font-size: 0.8125rem;
        font-weight: 500;
        letter-spacing: 0.04em;
        white-space: nowrap;
      }

      @media (min-width: 768px) {
        .float__wa {
          min-height: 60px;
          padding: 0 1.4rem;
        }

        .float__etiqueta {
          display: inline;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .float__wa {
          transition-duration: 0.01ms !important;
        }
      }
    `
  ]
})
export class WhatsappFloatComponent {
  protected readonly waLink = () => enlaceWhatsApp();
}
