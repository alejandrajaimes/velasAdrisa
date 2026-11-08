export interface Producto {
  /** Identificador unico, usado en la ruta /producto/:id */
  readonly id: string;
  readonly nombre: string;
  /** Precio en pesos colombianos (COP), sin separadores. */
  readonly precio: number;
  readonly descripcion: string;
  /** Tipo de vela, debe coincidir con `TipoVela.id`. */
  readonly tipo: string;
  readonly material: string;
  /** Medidas legibles, por ejemplo "Alto 25 cm x Diametro 14 cm". */
  readonly medidas: string;
  /** Rutas de imagen dentro de public/. Vacio = se muestra placeholder. */
  readonly imagenes: readonly string[];
  readonly destacado: boolean;
  readonly stock: boolean;
}

/** Tipo de vela del catalogo (hogar, aromaterapia, eventos...). */
export interface TipoVela {
  readonly id: string;
  readonly nombre: string;
  readonly descripcion: string;
  /** Ruta de imagen dentro de public/. Vacio = se muestra placeholder. */
  readonly imagen: string;
}
