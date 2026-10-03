import { Routes } from '@angular/router';

/**
 * Todas las rutas cargan su componente de forma diferida
 * (loadComponent): el bundle inicial se parte por pagina,
 * importante en redes moviles lentas.
 */
export const routes: Routes = [
  {
    path: '',
    title: 'Adrisa — Velas  Aromáticas para tu hogar',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'catalogo',
    title: 'Catalogo — Adrisa',
    loadComponent: () =>
      import('./pages/catalogo/catalogo.component').then(
        (m) => m.CatalogoComponent
      )
  },
  {
    path: 'producto/:id',
    title: 'Producto — Adrisa',
    loadComponent: () =>
      import('./pages/producto-detalle/producto-detalle.component').then(
        (m) => m.ProductoDetalleComponent
      )
  },
  {
    path: 'quienes-somos',
    title: 'Quienes somos — Adrisa',
    loadComponent: () =>
      import('./pages/quienes-somos/quienes-somos.component').then(
        (m) => m.QuienesSomosComponent
      )
  },
  {
    path: 'experiencia',
    title: 'Experiencia — Adrisa',
    loadComponent: () =>
      import('./pages/experiencia/experiencia.component').then(
        (m) => m.ExperienciaComponent
      )
  },
  {
    path: 'contacto',
    title: 'Contacto — Adrisa',
    loadComponent: () =>
      import('./pages/contacto/contacto.component').then(
        (m) => m.ContactoComponent
      )
  },
  { path: '**', redirectTo: '' }
];
