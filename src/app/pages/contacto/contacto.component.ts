import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  REDES,
  SITE_CONFIG,
  enlaceWhatsApp
} from '../../core/config/site.config';

interface FormularioContacto {
  nombre: string;
  email: string;
  telefono: string;
  ciudad: string;
  mensaje: string;
}

/**
 * Contacto.
 *
 * Sin backend: el formulario valida y arma el mensaje que
 * se abre en WhatsApp. Alternativamente puede generar un
 * mailto. No se guarda nada en el servidor.
 */
@Component({
  selector: 'app-contacto',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.scss'
})
export class ContactoComponent {
  @ViewChild('formEl') private formEl?: ElementRef<HTMLFormElement>;

  protected readonly sucursales = SITE_CONFIG.sucursales;
  protected readonly redes = REDES;
  protected readonly email = SITE_CONFIG.email;
  protected readonly anio = new Date().getFullYear();
  protected readonly waLink = () => enlaceWhatsApp();

  protected readonly enviado = signal(false);
  protected readonly errores = signal<Record<string, string>>({});

  protected readonly modelo: FormularioContacto = {
    nombre: '',
    email: '',
    telefono: '',
    ciudad: '',
    mensaje: ''
  };

  enviar(): void {
    const errores = this.validar();
    this.errores.set(errores);

    if (Object.keys(errores).length > 0) {
      // Enfoca el primer campo con error
      const primero = Object.keys(errores)[0];
      const el = this.formEl?.nativeElement.querySelector<HTMLElement>(
        `[name="${primero}"]`
      );
      el?.focus();
      return;
    }

    const m = this.modelo;
    const texto = [
      `Hola! Mi nombre es ${m.nombre}.`,
      m.telefono ? `Mi telefono es ${m.telefono}.` : '',
      m.ciudad ? `Me escribe desde ${m.ciudad}.` : '',
      '',
      m.mensaje
    ]
      .filter(Boolean)
      .join('\n');

    window.open(enlaceWhatsApp(texto), '_blank', 'noopener');
    this.enviado.set(true);
  }

  private validar(): Record<string, string> {
    const errores: Record<string, string> = {};
    const m = this.modelo;

    if (!m.nombre.trim()) {
      errores['nombre'] = 'Escribe tu nombre.';
    }

    if (!m.email.trim()) {
      errores['email'] = 'Escribe tu correo.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.email.trim())) {
      errores['email'] = 'Escribe un correo valido.';
    }

    if (m.telefono.trim() && !/^[0-9\s+\-()]{7,}$/.test(m.telefono.trim())) {
      errores['telefono'] = 'Escribe un telefono valido.';
    }

    if (!m.mensaje.trim()) {
      errores['mensaje'] = 'Cuentanos en que te podemos ayudar.';
    }

    return errores;
  }
}
