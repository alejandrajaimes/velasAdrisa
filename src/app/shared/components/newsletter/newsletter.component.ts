import {
  ChangeDetectionStrategy,
  Component,
  signal
} from '@angular/core';

/**
 * Suscripcion al newsletter.
 *
 * Solo visual: no hay backend. Al enviar muestra un aviso
 * de confirmacion. Cuando exista el servicio de correo,
 * aqui es donde se conecta.
 */
@Component({
  selector: 'app-newsletter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="news section section--azul">
      <div class="container news__grid">
        <div class="news__texto">
          <span class="t-eyebrow">Suscribete</span>
          <h2 class="t-h2">Recibe novedades y promociones</h2>
          <p class="t-lead">
            Te avisamos cuando llegan piezas nuevas y en qué momento
            abrir los pedidos de temporada.
          </p>
        </div>

        <form class="news__form" (ngSubmit)="enviar(email.value)">
          <div class="campo">
            <label for="news-email">Correo electronico</label>
            <input
              #email
              id="news-email"
              class="campo__control"
              type="email"
              name="email"
              inputmode="email"
              autocomplete="email"
              placeholder="tucorreo@ejemplo.com"
              [class.is-invalid]="error()"
              [disabled]="enviado()"
              required />
            @if (error()) {
              <p class="campo__error" role="alert">
                Escribe un correo valido.
              </p>
            }
          </div>

          <button
            class="btn btn--dorado btn--bloque"
            type="submit"
            [disabled]="enviado()">
            @if (enviado()) {
              ¡Listo! Gracias
            } @else {
              Suscribirme
            }
          </button>

          @if (enviado()) {
            <p class="news__aviso" role="status">
              Gracias. Muy pronto te escribiremos a tu correo.
            </p>
          }
        </form>
      </div>
    </section>
  `,
  styles: [
    `
      .news__grid {
        display: grid;
        gap: 2rem;
        align-items: center;
      }

      .news__texto {
        display: grid;
        gap: 0.75rem;
      }

      .news__form {
        display: grid;
        gap: 1rem;
      }

      .news__aviso {
        font-size: 0.9375rem;
        color: var(--dorado-claro);
      }

      @media (min-width: 992px) {
        .news__grid {
          grid-template-columns: 1.1fr 0.9fr;
          gap: 3.5rem;
        }
      }
    `
  ]
})
export class NewsletterComponent {
  protected readonly enviado = signal(false);
  protected readonly error = signal(false);

  enviar(valor: string): void {
    const correo = valor.trim();
    const valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

    if (!valido) {
      this.error.set(true);
      return;
    }

    this.error.set(false);
    this.enviado.set(true);
  }
}
