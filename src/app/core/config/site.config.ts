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

  // TODO: PROVISIONAL — reemplazar por el numero real (formato internacional, sin + ni espacios)
  whatsapp: '573001234567',
  whatsappTextoPorDefecto: 'Hola! Me gustaria recibir mas informacion sobre los productos de Adrisa.',

  // TODO: PROVISIONAL — reemplazar por las cuentas reales
  redes: [
    {
      nombre: 'Instagram',
      url: 'https://instagram.com/',
      icono: 'instagram'
    },
    {
      nombre: 'Facebook',
      url: 'https://facebook.com/',
      icono: 'facebook'
    }
  ] as readonly EnlaceSocial[],

  // TODO: PROVISIONAL — reemplazar por las direcciones reales
  sucursales: [
    {
      ciudad: 'Santa Marta',
      direccion: 'Carrera 4 # 23 - 49',
      celular: '3001234567',
      horario: 'Lunes a sabado, 9:00 a.m. - 6:00 p.m.'
    },
    {
      ciudad: 'Bogotá',
      direccion: 'Carrera 11 # 93 - 53',
      celular: '3007654321',
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
