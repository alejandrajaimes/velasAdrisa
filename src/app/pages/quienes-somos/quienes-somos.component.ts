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
      rol: 'Fundadora y directora creativa',
      texto:
        'Impulsa la selección de piezas y el lenguaje visual de Adrisa.'
    },
    {
      nombre: 'Dania Contreras',
      rol: 'Asesora de interiorismo',
      texto:
        'Ayuda a cada cliente a combinar piezas según su espacio y presupuesto.'
    },
    {
      nombre: 'Alejandra Jaimes',
      rol: 'Coordinación de talleres',
      texto:
        'Vela por la calidad y los tiempos de cada producción artesanal.'
    }
  ];
}
