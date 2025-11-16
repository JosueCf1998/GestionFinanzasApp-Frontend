import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ICONOS_CATEGORIA, COLORES_CATEGORIA } from 'src/app/shared/constants/category-options';
import { NavigationService } from "src/app/core/services/navigation.service";
import { Router } from '@angular/router';
import { Categoria } from 'src/app/shared/models/categoria.model';
import { CustomAlertComponent } from "../../../../shared/components/custom-alert/custom-alert.component";

@Component({
  selector: "app-new-transfer",
  templateUrl: "./new-transfer.page.html",
  styleUrls: ["./new-transfer.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, CustomAlertComponent],
})
export class NewTransferPage {

  // Lista de cuentas disponibles
  cuentas: { nombre: string, id: string, saldo?: number }[] = [];
  
  // Cuenta seleccionada en el modal
  cuentaSeleccionada: { nombre: string, id: string } | null = null;
  
  // Estado del modal
  isModalOpen: boolean = false;
  
  // Tipo de selección: 'origen' o 'destino'
  tipoSeleccion: 'origen' | 'destino' = 'origen';

  // Flag para detectar cambios
  cambiosPendientes = false;
  
  // Datos de la transferencia
  cuentaOrigenId: string = '';
  cuentaOrigen: string = '';
  cuentaDestinoId: string = '';
  cuentaDestino: string = '';
  monto: number | null = null;
  fecha: string = new Date().toISOString();
  comentario: string = '';
  
  // Alert customizado
  showCustomAlert: boolean = false;
  
  // Fecha máxima permitida (hoy)
  maxDate: string = new Date().toISOString();

  constructor(
    private navService: NavigationService,
    private router: Router
  ) {
    this.validarCuentasActivas();
  }
  
  /**
   * Valida y carga las cuentas activas del usuario
   * TODO: Integrar con el servicio real cuando esté disponible
   */
  validarCuentasActivas() {
    // Simulación de carga de cuentas
    // En producción, esto debería llamar a un servicio que obtenga las cuentas del backend
    this.cuentas = [
      { nombre: 'Principal', id: '1', saldo: 155 },
      { nombre: 'Ahorro', id: '2', saldo: 0 },
      { nombre: 'Tarjeta', id: '3', saldo: 500 }
    ];
    
    // Si hay al menos una cuenta, seleccionarla como origen por defecto
    if (this.cuentas.length > 0) {
      this.cuentaOrigenId = this.cuentas[0].id;
      this.cuentaOrigen = this.cuentas[0].nombre;
    }
  }

  /**
   * Abre el modal para seleccionar la cuenta de origen
   */
  seleccionarCuentaOrigen() {
    this.tipoSeleccion = 'origen';
    this.cuentaSeleccionada = null;
    this.isModalOpen = true;
  }

  /**
   * Abre el modal para seleccionar la cuenta de destino
   */
  seleccionarCuentaDestino() {
    // Filtrar la cuenta de origen para que no aparezca en destino
    this.tipoSeleccion = 'destino';
    this.cuentaSeleccionada = null;
    this.isModalOpen = true;
  }

  /**
   * Obtiene las cuentas disponibles según el tipo de selección
   * Para destino, excluye la cuenta de origen
   */
  get cuentasDisponibles() {
    if (this.tipoSeleccion === 'destino') {
      return this.cuentas.filter(c => c.id !== this.cuentaOrigenId);
    }
    return this.cuentas;
  }

  /**
   * Obtiene la clase CSS del modal según el número de cuentas disponibles
   * Esto permite que el modal se adapte dinámicamente a la cantidad de elementos
   */
  getModalClass(): string {
    const numCuentas = this.cuentasDisponibles.length;
    console.log('Número de cuentas disponibles:', numCuentas);
    console.log('Cuentas disponibles:', this.cuentasDisponibles);
    
    if (numCuentas === 1) {
      return 'custom-modal modal-small';
    } else if (numCuentas === 2) {
      return 'custom-modal modal-medium';
    } else if (numCuentas === 3) {
      return 'custom-modal modal-large';
    } else {
      return 'custom-modal modal-xlarge';
    }
  }

  /**
   * Abre el selector de fecha nativo
   */
  abrirSelectorFecha() {
    // El ion-datetime ya maneja esto, pero podrías abrir un modal personalizado
    console.log('Abrir selector de fecha');
  }

  /**
   * Guarda la transferencia
   * Valida los datos y envía al backend
   */
  async crearTransferencia() {
    // Validaciones
    if (!this.cuentaOrigenId || !this.cuentaDestinoId) {
      console.error('Debe seleccionar cuentas de origen y destino');
      return;
    }

    if (!this.monto || this.monto <= 0) {
      console.error('El monto debe ser mayor a 0');
      return;
    }

    if (this.cuentaOrigenId === this.cuentaDestinoId) {
      console.error('Las cuentas de origen y destino deben ser diferentes');
      return;
    }

    // Verificar que la cuenta origen tenga saldo suficiente
    const cuentaOrig = this.cuentas.find(c => c.id === this.cuentaOrigenId);
    if (cuentaOrig && cuentaOrig.saldo !== undefined && cuentaOrig.saldo < this.monto) {
      console.error('Saldo insuficiente en la cuenta de origen');
      return;
    }

    // Objeto de transferencia a enviar
    const transferencia = {
      cuentaOrigenId: this.cuentaOrigenId,
      cuentaDestinoId: this.cuentaDestinoId,
      monto: this.monto,
      fecha: this.fecha,
      comentario: this.comentario.trim()
    };

    console.log('Transferencia a guardar:', transferencia);

    // TODO: Llamar al servicio para guardar en el backend
    // await this.transferenciaService.crear(transferencia);

    // Marcar que no hay cambios pendientes
    this.cambiosPendientes = false;

    // Navegar de regreso
    this.navService.back();
  }

  /**
   * Abre el modal de cuentas
   */
  openModal() {
    this.isModalOpen = true;
  }

  /**
   * Cierra el modal de cuentas
   */
  closeModal() {
    this.isModalOpen = false;
    this.cuentaSeleccionada = null;
  }

  /**
   * Actualiza el monto o confirma la selección de cuenta
   */
  updateAmount() {
    if (this.cuentaSeleccionada) {
      this.confirmarCuenta();
    }
    this.closeModal();
  }

  /**
   * Abre el modal de cuentas
   * @deprecated Usar seleccionarCuentaOrigen o seleccionarCuentaDestino
   */
  abrirModalCuentas() {
    this.isModalOpen = true;
    this.cuentaSeleccionada = null;
  }
  
  /**
   * Selecciona una cuenta en el modal
   */
  seleccionarCuentaModal(cuenta: { nombre: string, id: string }) {
    this.cuentaSeleccionada = cuenta;
    this.marcarCambiosPendientes();
  }
  
  /**
   * Confirma la selección y asigna la cuenta según el tipo
   */
  confirmarCuenta() {
    if (!this.cuentaSeleccionada) return;

    if (this.tipoSeleccion === 'origen') {
      this.cuentaOrigenId = this.cuentaSeleccionada.id;
      this.cuentaOrigen = this.cuentaSeleccionada.nombre;
      
      // Si la cuenta destino es la misma que origen, limpiarla
      if (this.cuentaDestinoId === this.cuentaOrigenId) {
        this.cuentaDestinoId = '';
        this.cuentaDestino = '';
      }
    } else {
      this.cuentaDestinoId = this.cuentaSeleccionada.id;
      this.cuentaDestino = this.cuentaSeleccionada.nombre;
    }

    this.closeModal();
  }

  /**
   * Marca que hay cambios pendientes
   */
  marcarCambiosPendientes() {
    this.cambiosPendientes = true;
  }

  /**
   * Detecta cambios en los inputs para activar la alerta
   */
  onInputChange() {
    this.marcarCambiosPendientes();
  }

  /**
   * Navega hacia atrás con validación de cambios pendientes
   */
  async backToCategories() {
    // Verificar si hay cambios reales
    const hayCambios = 
      this.cuentaDestinoId !== '' ||
      (this.monto !== null && this.monto > 0) ||
      this.comentario.trim() !== '';

    if (hayCambios) {
      this.showCustomAlert = true;
    } else {
      (document.activeElement as HTMLElement)?.blur();
      this.navService.back();
    }
  }

  /**
   * Sale sin guardar los cambios
   */
  salirSinGuardar() {
    this.showCustomAlert = false;
    (document.activeElement as HTMLElement)?.blur();
    this.navService.back();
  }

}
