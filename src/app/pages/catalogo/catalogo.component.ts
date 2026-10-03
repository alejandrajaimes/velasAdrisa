import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { TIPOS_VELA } from '../../core/data/tipos-vela';
import { PRODUCTOS } from '../../core/data/productos';
import { enlaceWhatsApp } from '../../core/config/site.config';
import {
  ProductCardComponent
} from '../../shared/components/product-card/product-card.component';
import {
  PlaceholderImgComponent
} from '../../shared/components/placeholder-img/placeholder-img.component';

/**
 * Catalogo visual. No hay carrito: cada producto enlaza a
 * WhatsApp con su mensaje pre-cargado.
 *
 * El producto siempre es vela, asi que el filtro de chips
 * selecciona el tipo de vela (hogar, aromaterapia, eventos...)
 * con scroll horizontal con snap en vez de un <select>,
 * que resulta incomodo en movil.
 */
@Component({
  selector: 'app-catalogo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ProductCardComponent,
    PlaceholderImgComponent
  ],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.scss'
})
export class CatalogoComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly tipoActivo = signal<string>('todos');

  protected readonly tipos = TIPOS_VELA;
  protected readonly todos = PRODUCTOS;
  protected readonly waLink = () => enlaceWhatsApp();

  protected readonly filtrados = computed(() =>
    this.todos.filter((p) => {
      const activo = this.tipoActivo();
      return activo === 'todos' || p.tipo === activo;
    })
  );

  protected readonly hayFiltro = computed(
    () => this.tipoActivo() !== 'todos'
  );
  protected readonly total = computed(
    () => this.filtrados().length
  );

  constructor(route: ActivatedRoute) {
    route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const id = params.get('tipo');
        this.tipoActivo.set(
          id && TIPOS_VELA.some((t) => t.id === id) ? id : 'todos'
        );
      });
  }

  filtrar(id: string): void {
    this.tipoActivo.set(id);
  }

  /** Indica si el tipo de vela `id` es el actualmente seleccionado. */
  esActiva(id: string): boolean {
    return this.tipoActivo() === id;
  }
}
