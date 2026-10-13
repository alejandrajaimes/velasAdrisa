import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE_CONFIG } from '../../core/config/site.config';
import {
  SectionHeadingComponent
} from '../../shared/components/section-heading/section-heading.component';
import {
  PlaceholderImgComponent
} from '../../shared/components/placeholder-img/placeholder-img.component';

/**
 * Quienes somos: historia, manifiesto, valores y equipo.
 */
@Component({
  selector: 'app-quienes-somos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, SectionHeadingComponent, PlaceholderImgComponent],
  templateUrl: './quienes-somos.component.html',
  styleUrl: './quienes-somos.component.scss'
})
export class QuienesSomosComponent {
  protected readonly fundacion = SITE_CONFIG.fundacion;

protected readonly valores = [
  {
    num: '01',
    titulo: 'Amor',
    texto:
      'Ponemos amor en cada detalle, desde la elección de cada producto hasta la forma en que lo preparamos para ti.'
  },
  {
    num: '02',
    titulo: 'Creatividad',
    texto:
      'Creamos y seleccionamos productos con ideas diferentes, buscando siempre sorprenderte y darle un toque especial a cada experiencia.'
  },
  {
    num: '03',
    titulo: 'Distinción',
    texto:
      'Cuidamos cada detalle para ofrecerte productos únicos, con personalidad y ese toque especial que hace la diferencia.'
  }
];

  protected readonly equipo = [
    {
      nombre: 'Melany Montoya',
      rol: 'FUNDADORA · DIRECCIÓN Y PRODUCCIÓN',
      foto: 'Melany.jpeg',
      texto:
        'Es la experiencia que da vida a nuestras ideas. Aporta su conocimiento artesanal, nos guía en cada proceso y lidera la selección de insumos para cuidar la calidad de cada creación.'
    },
    {
      nombre: 'Dania Contreras',
      rol: 'DIRECCIÓN CREATIVA Y DISEÑO',
      foto: 'DANIA.jpg',
      texto:
        'Transforma ideas en experiencias visuales únicas. Su creatividad, sensibilidad estética y atención al detalle dan vida a cada diseño, creando piezas visuales que transmiten la esencia de Adrisa y convierten cada creación en algo verdaderamente especial.'
    },
    {
      nombre: 'Alejandra Jaimes',
      rol: 'DIRECCIÓN DIGITAL Y TECNOLOGÍA',
      foto: 'Alejandra2.jpeg',
      texto:
        'Impulsa la evolución digital de Adrisa a través de nuestra página web, herramientas administrativas y soluciones tecnológicas que acompañan el crecimiento de la marca.'
    }
  ];
}
