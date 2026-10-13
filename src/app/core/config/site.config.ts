export interface EnlaceSocial {
  readonly nombre: string;
  readonly url: string;
  readonly icono: 'instagram' | 'facebook' | 'whatsapp';
}

export interface Sucursal {
  readonly ciudad: string;
  readonly direccion: string;
  readonly celular: string;
  readonly horario: string;
}

/**
 * Datos centrales del sitio.
 *
 * TODO: reemplazar todos los valores marcados como
 * PROVISIONAL por los datos reales de Adrisa.
 * Este es el unico archivo que hay que tocar para
 * actualizar telefono, redes, direcciones o textos.
 */
export const SITE_CONFIG = {
  nombre: 'Adrisa',
  eslogan: 'Velas  Aromáticas para tu hogar',

  whatsapp: '573182445257',
  whatsappTextoPorDefecto: 'Hola! Me gustaria recibir mas informacion sobre los productos de Adrisa.',

  redes: [
    {
      nombre: 'Instagram',
      url: 'https://www.instagram.com/adrisa.velas.aromaticas/',
      icono: 'instagram'
    },
    {
      nombre: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61563832183210',
      icono: 'facebook'
    }
  ] as readonly EnlaceSocial[],

  // TODO: PROVISIONAL — reemplazar por las direcciones reales
  sucursales: [
    {
      ciudad: 'Bogotá',
      direccion: 'Carrera 90a #76a-18, Engativa',
      celular: '3182445257',
      horario: 'Lunes a sabado, 9:00 a.m. - 6:00 p.m.'
    },
    {
      ciudad: 'Santa Marta',
      direccion: 'Mz Q casa 8, Urbanización Cantilito',
      celular: '3182445257',
      horario: 'Lunes a sabado, 9:00 a.m. - 6:00 p.m.'
    }
  ] as readonly Sucursal[],

  // TODO: PROVISIONAL — reemplazar por el email real
  email: 'hola@adrisa.com',

  // TODO: PROVISIONAL — ajustar textos legales
  empresa: 'Adrisa',
  nit: 'NIT 000.000.000-0',
  fundacion: 2019,

  nav: [
    { texto: 'Inicio', ruta: '/' },
    { texto: 'Catalogo', ruta: '/catalogo' },
    { texto: 'Quienes somos', ruta: '/quienes-somos' },
    { texto: 'Experiencia', ruta: '/experiencia' },
    { texto: 'Contacto', ruta: '/contacto' }
  ]
} as const;

export const REDES: readonly EnlaceSocial[] = SITE_CONFIG.redes;

/** Construye un enlace de WhatsApp con mensaje precargado. */
export function enlaceWhatsApp(mensaje?: string): string {
  const texto = mensaje?.trim() || SITE_CONFIG.whatsappTextoPorDefecto;
  return `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`;
}

/** Enlace de WhatsApp para un producto concreto. */
export function enlaceWhatsAppProducto(
  nombre: string,
  referencia: string
): string {
  const mensaje = `Hola! Me interesa el producto *${nombre}* (ref. ${referencia}). Me gustaria conocer precio, medidas y disponibilidad.`;
  return enlaceWhatsApp(mensaje);
}
