import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE_CONFIG } from '../../core/config/site.config';
import {
  SectionHeadingComponent
} from '../../shared/components/section-heading/section-heading.component';

/**
 * Experiencia: trayectoria, metricas, proceso de compra,
 * garantia y logistica.
 *
 * La linea de tiempo es vertical en movil (izquierda, con
 * nodo dorado) y horizontal en pantallas grandes.
 */
@Component({
  selector: 'app-experiencia',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, SectionHeadingComponent],
  templateUrl: './experiencia.component.html',
  styleUrl: './experiencia.component.scss'
})
export class ExperienciaComponent {
  protected readonly fundacion = SITE_CONFIG.fundacion;

  protected readonly metricas = [
    {
      valor: '2.500+',
      etiqueta: 'Pedidos entregados'
    },
    {
      valor: '12',
      etiqueta: 'Talleres aliados'
    },
    {
      valor: '4',
      etiqueta: 'Ciudades con envío'
    },
    {
      valor: '4.9',
      etiqueta: 'Satisfacción promedio'
    }
  ];

  protected readonly hitos = [
    {
      anio: String(this.fundacion),
      titulo: 'El primer taller',
      texto:
        'Adrisa comienza seleccionando velas hechas a mano para hogares de Santa Marta, con un catálogo pequeño y mucho cuidado en cada elección.'
    },
    {
      anio: '2021',
      titulo: 'Bogotá y el envío nacional',
      texto:
        'Abrimos una segunda ciudad y empezamos a enviar a todo el país, con empaques pensados para que cada pieza llegue intacta.'
    },
    {
      anio: '2023',
      titulo: 'Asesoría personalizada',
      texto:
        'Sumamos un servicio de acompañamiento: nos escribes por WhatsApp y te proponemos combinaciones según tu espacio y presupuesto.'
    },
    {
      anio: '2025',
      titulo: 'Nueva colección permanente',
      texto:
        'Consolidamos una línea estable de velas de cera vegetal, con reposición continua y materiales verificados.'
    }
  ];

  protected readonly proceso = [
    {
      num: '01',
      titulo: 'Nos escribes',
      texto:
        'Cuéntanos qué buscas o qué espacio quieres transformar. Respondemos por WhatsApp en horario hábil.'
    },
    {
      num: '02',
      titulo: 'Te proponemos',
      texto:
        'Te enviamos opciones con precio, medidas exactas y fotos reales de la vela que vas a recibir.'
    },
    {
      num: '03',
      titulo: 'Confirmas y enviamos',
      texto:
        'Una vez que confirmas, preparamos tu pedido y lo despachamos con empaque de protección.'
    },
    {
      num: '04',
      titulo: 'Llega a tu casa',
      texto:
        'Te damos seguimiento hasta la entrega. Si algo no es lo esperado, lo resolvemos contigo.'
    }
  ];

  protected readonly garantias = [
    {
      titulo: 'Velas verificadas',
      texto:
        'Revisamos cada vela antes del despacho: mecha, acabado, aroma y medidas.'
    },
    {
      titulo: 'Empaque protegido',
      texto:
        'Doble capa de protección para velas en vidrio y figuras de cera, con relleno reciclable.'
    },
    {
      titulo: 'Acompañamiento real',
      texto:
        'Si tienes dudas o necesitas cambiar algo, te atendemos por WhatsApp, no por un ticket.'
    },
    {
      titulo: 'Envíos a todo el país',
      texto:
        'Coordinamos con las mejores transportadoras y te avisamos el estado de tu pedido.'
    }
  ];
}
