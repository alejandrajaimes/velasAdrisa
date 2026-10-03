import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  input
} from '@angular/core';

/**
 * Encabezado de sección: eyebrow dorado, título serif y
 * subtítulo opcional. El `centro` centra y oculta el
 * filete del eyebrow.
 */
@Component({
  selector: 'app-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="head" [class.head--centro]="centro()">
      @if (eyebrow()) {
        <span class="t-eyebrow">{{ eyebrow() }}</span>
      }
      <h2 class="t-h2">{{ titulo() }}</h2>
      @if (subtitulo()) {
        <p class="t-lead">{{ subtitulo() }}</p>
      }
    </header>
  `,
  styles: `
    .head {
      max-width: 62ch;
      margin-bottom: clamp(2rem, 4vw, 3.25rem);

      > * + * {
        margin-top: 0.75rem;
      }
    }

    .head--centro {
      margin-inline: auto;
      text-align: center;

      .t-eyebrow::before {
        display: none;
      }
    }
  `
})
export class SectionHeadingComponent {
  readonly eyebrow = input('');
  readonly titulo = input.required<string>();
  readonly subtitulo = input('');
  readonly centro = input(false, { transform: booleanAttribute });
}
