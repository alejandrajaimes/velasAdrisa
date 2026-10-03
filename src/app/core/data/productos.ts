import { Producto } from '../models/producto';

/**
 * Catalogo de productos.
 *
 * Vacio a proposito: el catalogo real se carga aqui.
 * Cada linea se agrega copiando un objeto con la forma
 * de `Producto`. El sitio funciona sin productos: la
 * pagina de catalogo muestra un estado de espera.
 *
 * Ejemplo de como se agrega un producto:
 *
 * {
 *   id: 'vela-sal-restaurante',
 *   nombre: 'Vela Sal de Playa',
 *   precio: 68000,
 *   descripcion: 'Vela aromática de cera vegetal con aroma a sal y mar...',
 *   tipo: 'hogar',
 *   material: 'Cera vegetal, mecha de algodon',
 *   medidas: 'Alto 12 cm x Diametro 9 cm',
 *   imagenes: ['productos/vela-sal-playa.jpg'],
 *   destacado: true,
 *   stock: true
 * }
 */
export const PRODUCTOS: readonly Producto[] = [];

/** Productos marcados como destacados para la home. */
export const PRODUCTOS_DESTACADOS: readonly Producto[] = PRODUCTOS.filter(
  (p) => p.destacado
);

/** Busca un producto por id. */
export function productoPorId(id: string): Producto | undefined {
  return PRODUCTOS.find((p) => p.id === id);
}
