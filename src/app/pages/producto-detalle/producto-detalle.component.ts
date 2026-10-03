import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { productoPorId } from '../../core/data/productos';
import { TIPOS_VELA_POR_ID } from '../../core/data/tipos-vela';
import { Producto } from '../../core/models/producto';
import {
  enlaceWhatsAppProducto
} from '../../core/config/site.config';
import { PrecioPipe } from '../../core/pipes/precio.pipe';
import {
  PlaceholderImgComponent
} from '../../shared/components/placeholder-img/placeholder-img.component';

/**
 * Detalle de producto.
 *
 * - Si el id no existe, redirige al catalogo.
 * - La galeria usa imagenes reales si existen, placeholder si no.
 * - En movil el boton de WhatsApp queda sticky abajo, como
 *   en las apps de comercio, para no tener que subir 2000px.
 */
@Component({
  selector: 'app-producto-detalle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, PrecioPipe, PlaceholderImgComponent],
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.scss'
})
export class ProductoDetalleComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly producto = signal<Producto | undefined>(undefined);

  protected readonly existe = computed(() => this.producto() !== undefined);

  protected readonly nombre = computed(() => this.producto()?.nombre ?? '');
  protected readonly descripcion = computed(
    () => this.producto()?.descripcion ?? ''
  );
  protected readonly material = computed(
    () => this.producto()?.material ?? ''
  );
  protected readonly medidas = computed(
    () => this.producto()?.medidas ?? ''
  );
  protected readonly precio = computed(() => this.producto()?.precio ?? null);
  protected readonly stock = computed(() => this.producto()?.stock ?? false);
  protected readonly imagenes = computed(
    () => this.producto()?.imagenes ?? []
  );
  protected readonly tipoNombre = computed(() => {
    const id = this.producto()?.tipo;
    return id ? TIPOS_VELA_POR_ID.get(id)?.nombre ?? '' : '';
  });
  protected readonly enlace = computed(() =>
    enlaceWhatsAppProducto(
      this.producto()?.nombre ?? '',
      this.producto()?.id ?? ''
    )
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const id = params.get('id') ?? '';
        const encontrado = productoPorId(id);

        if (encontrado) {
          this.producto.set(encontrado);
        } else {
          this.producto.set(undefined);
          this.router.navigate(['/catalogo'], { replaceUrl: true });
        }
      });
  }
}
