import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formatea un numero como pesos colombianos: $ 145.000
 * Uso: {{ producto.precio | precio }}
 */
@Pipe({
  name: 'precio',
  standalone: true
})
export class PrecioPipe implements PipeTransform {
  private readonly formato = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  transform(valor: number | null | undefined): string {
    if (valor === null || valor === undefined || Number.isNaN(valor)) {
      return 'Precio por confirmar';
    }
    // Intl devuelve espacios finos (U+202F) que no se renderizan
    // de forma consistente entre navegadores; se normalizan.
    return this.formato.format(valor).replace(/[\u202f\u00a0]/g, ' ');
  }
}
