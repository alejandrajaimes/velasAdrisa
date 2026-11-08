import { TipoVela } from '../models/producto';

/**
 * Tipos de vela del catalogo.
 *
 * El producto es siempre vela: lo que cambia es el uso
 * o la ocasion. El id debe coincidir con `producto.tipo`.
 * Agrega o quita lineas segun crezca el catalogo.
 */
export const TIPOS_VELA: readonly TipoVela[] = [
  {
    id: 'hogar',
    nombre: 'Home Elegant',
    descripcion: 'Velas aromaticas y decorativas para ambientar tu casa.',
    imagen: 'productos/home-img-tipo-1.jpg'
  },
  {
    id: 'recordatorio',
    nombre: 'Navidad',
    descripcion: 'Velas para memoriales, altares y momentos de recuerdo.',
    imagen: 'productos/home-img-tipo-2.jpg'
  },
  {
    id: 'fechas-especiales',
    nombre: 'Personalizados',
    descripcion: 'Navidad, cumpleanos, bodas y demas fechas para celebrar.',
    imagen: 'productos/home-img-tipo-3.jpg'
  }
];

export const TIPOS_VELA_POR_ID: ReadonlyMap<string, TipoVela> = new Map(
  TIPOS_VELA.map((t) => [t.id, t])
);
