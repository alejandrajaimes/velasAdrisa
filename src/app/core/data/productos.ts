import { Producto } from '../models/producto';

/**
 * Catalogo de productos.
 *
 * PRODUCTOS DE EJEMPLO con imagenes locales en public/productos/
 * para visualizar la interfaz. Reemplazar por los productos
 * reales de Adrisa cuando esten disponibles.
 */
export const PRODUCTOS: readonly Producto[] = [
  {
    id: 'vela-lavanda-relax',
    nombre: 'Vela Lavanda Relax',
    precio: 45000,
    descripcion:
      'Vela aromática de cera vegetal con esencia de lavanda francesa. Perfecta para momentos de relajación y descanso. Quema limpia durante aproximadamente 25 horas.',
    tipo: 'hogar',
    material: 'Cera de soya, mecha de algodón, esencia de lavanda',
    medidas: 'Alto 10 cm x Diametro 8 cm',
    imagenes: [
      'productos/vela-1.jpg',
      'productos/vela-5.jpg',
      'productos/vela-6.jpg'
    ],
    destacado: true,
    stock: true
  },
  {
    id: 'vela-vainilla-hogar',
    nombre: 'Vela Vainilla Dulce',
    precio: 38000,
    descripcion:
      'Vela de cera de soya con aroma a vainilla bourbon. Llena tu hogar de calidez y dulzura. Ideal para salas y dormitorios.',
    tipo: 'hogar',
    material: 'Cera de soya, mecha de algodón, esencia de vainilla',
    medidas: 'Alto 8 cm x Diametro 7 cm',
    imagenes: [
      'productos/vela-2.jpg',
      'productos/vela-8.jpg'
    ],
    destacado: true,
    stock: true
  },
  {
    id: 'vela-memorial-angel',
    nombre: 'Vela Memorial Ángel',
    precio: 52000,
    descripcion:
      'Vela memorial en figura de ángel, elaborada en cera blanca. Un homenaje delicado para honrar la memoria de tus seres queridos.',
    tipo: 'recordatorio',
    material: 'Cera de parafina premium, mecha de algodón',
    medidas: 'Alto 15 cm x Ancho 10 cm',
    imagenes: [
      'productos/vela-6.jpg',
      'productos/vela-1.jpg'
    ],
    destacado: false,
    stock: true
  },
  {
    id: 'vela-navidena-canela',
    nombre: 'Vela Navideña Canela',
    precio: 42000,
    descripcion:
      'Vela aromática con esencia de canela y clavo de olor. El aroma perfecto para las fiestas decembrinas y los momentos en familia.',
    tipo: 'fechas-especiales',
    material: 'Cera de soya, mecha de algodón, especias naturales',
    medidas: 'Alto 12 cm x Diametro 9 cm',
    imagenes: [
      'productos/vela-5.jpg',
      'productos/vela-2.jpg',
      'productos/vela-8.jpg'
    ],
    destacado: true,
    stock: true
  },
  {
    id: 'vela-cumpleanos-dorada',
    nombre: 'Vela Cumpleaños Dorada',
    precio: 35000,
    descripcion:
      'Vela decorativa con acabado dorado y lista para tu celebración. Incluye decoración dorada y mecha de algodón.',
    tipo: 'fechas-especiales',
    material: 'Cera de soya, mecha de algodón, glitter comestible dorado',
    medidas: 'Alto 14 cm x Diametro 6 cm',
    imagenes: [
      'productos/vela-8.jpg',
      'productos/vela-4.jpg'
    ],
    destacado: false,
    stock: false
  },
  {
    id: 'vela-memorial-roja',
    nombre: 'Vela Memorial Roja',
    precio: 48000,
    descripcion:
      'Vela memorial en color rojo con acabado elegante. Diseñada para altares y momentos de recuerdo con especial reverencia.',
    tipo: 'recordatorio',
    material: 'Cera de parafina premium, mecha de algodón',
    medidas: 'Alto 18 cm x Diametro 7 cm',
    imagenes: [
      'productos/vela-4.jpg',
      'productos/vela-5.jpg',
      'productos/vela-6.jpg'
    ],
    destacado: false,
    stock: true
  }
];

/** Productos marcados como destacados para la home. */
export const PRODUCTOS_DESTACADOS: readonly Producto[] = PRODUCTOS.filter(
  (p) => p.destacado
);

/** Busca un producto por id. */
export function productoPorId(id: string): Producto | undefined {
  return PRODUCTOS.find((p) => p.id === id);
}
