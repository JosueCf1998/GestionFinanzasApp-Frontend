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


  cuentas: { nombre: string, id: string }[] = [
  { nombre: 'Principal', id: '1' },
  { nombre: 'Ahorros', id: '2' },
  { nombre: 'Ahorros', id: '3' },
  { nombre: 'Tarjeta', id: '4' }
  // Puedes cargar dinámicamente desde tu servicio
];
cuentaSeleccionada: { nombre: string, id: string } | null = null;
isModalOpen: boolean = false;


  cambiosPendientes = false;

  category: Categoria = {
    nombre: "",
    icono: "",
    color: ""
  };
  
  cuentaOrigen: string = 'Principal';
  cuentaDestino: string = '';
  monto: number | null = null;
  fecha: Date = new Date();
  comentario: string = '';
  showCustomAlert: boolean = false;

  constructor(
    private navService: NavigationService,
    private router: Router
  ) {
  }

  seleccionarCuentaOrigen() {
    // Lógica para abrir selector de cuenta origen
    this.isModalOpen = true;
  }

  seleccionarCuentaDestino() {
    // Lógica para abrir selector de cuenta destino
  }

  abrirCalculadora() {
    // Lógica para abrir modal/calculadora
  }

  abrirSelectorFecha() {
    // Lógica para abrir selector de fecha
  }

  crearTransferencia() {
    // Lógica para guardar la transferencia
    // Validar campos y enviar al backend
  }







  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  updateAmount() {
    
  }


  abrirModalCuentas() {
    this.isModalOpen = true;
    this.cuentaSeleccionada = null;
  }
  
  // Selecciona una cuenta en el modal
  seleccionarCuentaModal(cuenta: { nombre: string, id: string }) {
    this.cuentaSeleccionada = cuenta;
  }
  
  // Confirma la selección y asigna la cuenta
  confirmarCuenta() {
    this.cuentaOrigen = this.cuentaSeleccionada?.nombre || '';
    this.closeModal();
  }






  async backToCategories() {
    if (this.cambiosPendientes) {
      this.showCustomAlert = true;
    } else {
      (document.activeElement as HTMLElement)?.blur();
      this.navService.forward('/main/accounts', 'slide-right');
    }
  }

  salirSinGuardar() {
    this.showCustomAlert = false;
    (document.activeElement as HTMLElement)?.blur();
    this.navService.forward('/main/accounts', 'slide-right');
  }

}
