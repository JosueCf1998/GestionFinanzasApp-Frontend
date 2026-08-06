import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';

export type LegalDocumentType = 'privacy' | 'terms';

interface DocumentContent {
  title: string;
  lastUpdated: string;
  sections: { heading: string; content: string }[];
}

const PRIVACY_POLICY: DocumentContent = {
  title: 'Política de Privacidad',
  lastUpdated: '01 de julio de 2026',
  sections: [
    {
      heading: '1. Identidad y datos de contacto del responsable',
      content: 'FinVia E.I.R.L., con RUC 12345678901 y domicilio en Lima, Perú, es el responsable del tratamiento de tus datos personales. Para cualquier consulta, puedes contactarnos a través del correo electrónico soporte@finvia.pe.',
    },
    {
      heading: '2. Finalidad del tratamiento de datos',
      content: 'Tus datos personales serán tratados con las siguientes finalidades: (a) Gestionar tu cuenta de usuario, presupuestos y transacciones; (b) Brindar soporte técnico y atención al cliente; (c) Enviar notificaciones relacionadas con el funcionamiento de la aplicación; (d) Cumplir con obligaciones legales y regulatorias aplicables.',
    },
    {
      heading: '3. Base legal del tratamiento',
      content: 'El tratamiento de tus datos se basa en tu consentimiento expreso, otorgado al momento de registrarte y aceptar la presente Política de Privacidad, así como en la ejecución de los términos de uso de la aplicación.',
    },
    {
      heading: '4. Datos personales recopilados',
      content: 'Recopilamos la siguiente información: (a) Datos de identificación: nombre completo, correo electrónico y número de teléfono; (b) Datos financieros: información sobre ingresos, gastos, cuentas y transacciones que registres voluntariamente en la aplicación; (c) Datos de uso: estadísticas de navegación y preferencias de configuración; (d) Datos de ubicación: solo si otorgas consentimiento explícito y separado.',
    },
    {
      heading: '5. Datos de ubicación y cookies',
      content: 'FinVia no utiliza cookies no esenciales ni recopila datos de ubicación sin tu consentimiento explícito previo. Puedes retirar tu consentimiento en cualquier momento desde la configuración de tu dispositivo. El tratamiento de datos de ubicación y cookies no esenciales requerirá un consentimiento independiente, conforme al Decreto Supremo N.º 016-2024-JUS.',
    },
    {
      heading: '6. Derechos ARCO',
      content: 'Tienes derecho a acceder, rectificar, cancelar y oponerte al tratamiento de tus datos personales (derechos ARCO). Para ejercer estos derechos, envía una solicitud a soporte@finvia.pe indicando el derecho que deseas ejercer y los datos necesarios para tu identificación. Responderemos tu solicitud dentro del plazo legal establecido.',
    },
    {
      heading: '7. Plazo de conservación de datos',
      content: 'Conservamos tus datos personales mientras mantengas una cuenta activa en FinVia. Una vez que elimines tu cuenta, tus datos serán bloqueados y posteriormente eliminados en un plazo máximo de cinco (5) años, salvo obligación legal de conservación por plazos superiores.',
    },
    {
      heading: '8. Medidas de seguridad',
      content: 'FinVia aplica medidas de seguridad técnicas, organizativas y legales para proteger tus datos personales contra acceso no autorizado, pérdida, destrucción o alteración. Estas medidas incluyen cifrado de extremo a extremo, controles de acceso y monitoreo continuo de nuestros sistemas.',
    },
    {
      heading: '9. Transferencias internacionales de datos',
      content: 'Para brindar el servicio, FinVia puede utilizar proveedores de servicios en la nube ubicados fuera del Perú. En tales casos, se garantiza que dichos proveedores cumplen con estándares de protección de datos equivalentes a los exigidos por la legislación peruana, mediante la suscripción de cláusulas contractuales tipo u otros mecanismos válidos.',
    },
    {
      heading: '10. Autoridad de control',
      content: 'La Autoridad Nacional de Protección de Datos Personales (ANPDP) es el organismo encargado de supervisar el cumplimiento de la Ley de Protección de Datos Personales. Puedes presentar reclamos ante la ANPDP si consideras que tus derechos han sido vulnerados.',
    },
    {
      heading: '11. Contacto del Oficial de Protección de Datos',
      content: 'FinVia cuenta con un Oficial de Protección de Datos (DPO) designado. Puedes contactarlo a través del correo dpo@finvia.pe para cualquier consulta relacionada con el tratamiento de tus datos personales.',
    },
    {
      heading: '12. Actualizaciones de esta política',
      content: 'Esta Política de Privacidad puede ser actualizada periódicamente. Notificaremos cualquier cambio significativo a través de la aplicación o por correo electrónico. La versión actualizada entrará en vigor desde su fecha de publicación.',
    },
  ],
};

const TERMS_OF_USE: DocumentContent = {
  title: 'Términos de Uso',
  lastUpdated: '01 de julio de 2026',
  sections: [
    {
      heading: '1. Descripción del servicio',
      content: 'FinVia es una aplicación de finanzas personales que te permite registrar y organizar tus ingresos, gastos, presupuestos y cuentas. El servicio se proporciona "tal cual" y "según disponibilidad", realizando esfuerzos comercialmente razonables para garantizar su funcionamiento continuo.',
    },
    {
      heading: '2. Derechos y deberes del usuario',
      content: 'Como usuario de FinVia, tienes derecho a: (a) Acceder y utilizar la aplicación de acuerdo con estos términos; (b) Solicitar soporte técnico; (c) Ejercer tus derechos ARCO sobre tus datos personales. Asimismo, te comprometes a: (a) Proporcionar información veraz y actualizada; (b) No utilizar la aplicación para fines ilícitos; (c) Mantener la confidencialidad de tus credenciales de acceso.',
    },
    {
      heading: '3. Registro y uso de cuenta',
      content: 'Para utilizar FinVia debes registrarte creando una cuenta con correo electrónico y contraseña. Eres responsable de mantener la confidencialidad de tus credenciales. FinVia se reserva el derecho de suspender o cerrar tu cuenta en caso de: (a) Violación de estos términos; (b) Uso fraudulento o ilícito de la aplicación; (c) Solicitud expresa tuya; (d) Inactividad prolongada según se defina en actualizaciones futuras.',
    },
    {
      heading: '4. Limitación de responsabilidad',
      content: 'FinVia no será responsable por daños indirectos, incidentales o consecuentes derivados del uso o la imposibilidad de uso de la aplicación, incluyendo pero no limitado a pérdidas financieras, errores en el registro de transacciones o decisiones basadas en la información proporcionada por la aplicación. La información proporcionada por FinVia es referencial y no constituye asesoría financiera profesional.',
    },
    {
      heading: '5. Reclamos y Libro de Reclamaciones',
      content: 'FinVia pone a tu disposición un Libro de Reclamaciones virtual para registrar cualquier queja o reclamo. Puedes acceder a él a través de la aplicación o solicitándolo a soporte@finvia.pe. Asimismo, puedes acudir al Indecopi para resolver controversias que no puedan ser solucionadas directamente.',
    },
    {
      heading: '6. Modificación de los términos',
      content: 'FinVia se reserva el derecho de modificar estos términos en cualquier momento. Los cambios serán notificados a través de la aplicación o por correo electrónico con al menos quince (15) días calendario de anticipación. El uso continuado de la aplicación después de la fecha de vigencia de los cambios constituye tu aceptación de los nuevos términos.',
    },
    {
      heading: '7. Legislación aplicable y fuero',
      content: 'Estos términos se rigen por la legislación de la República del Perú. Para cualquier controversia derivada de su interpretación o ejecución, las partes se someten a la jurisdicción de los jueces y tribunales de Lima, Perú, renunciando expresamente a cualquier otro fuero o jurisdicción.',
    },
    {
      heading: '8. Versión del documento',
      content: 'Este documento corresponde a la versión 1.0, publicada el 01 de julio de 2026. Cualquier versión anterior queda reemplazada por la presente.',
    },
  ],
};

@Component({
  selector: 'app-legal-document-viewer',
  templateUrl: './legal-document-viewer.page.html',
  styleUrls: ['./legal-document-viewer.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, PageLayoutComponent],
})
export class LegalDocumentViewerPage implements OnInit {
  document!: DocumentContent;

  constructor(
    private route: ActivatedRoute,
    private navService: NavigationService,
  ) {}

  ngOnInit(): void {
    const type = this.route.snapshot.paramMap.get('type') as LegalDocumentType;
    this.document = type === 'privacy' ? PRIVACY_POLICY : TERMS_OF_USE;
  }

  goBack(): void {
    this.navService.back();
  }
}
