import { Component, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { NavigationService } from "src/app/core/services/navigation.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-detail-transfer",
  templateUrl: "./detail-transfer.page.html",
  styleUrls: ["./detail-transfer.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class DetailTransferPage implements OnInit {

  title: string = 'Detalle Transferencia';
  
  transferId: number | null = null;
  cuentaOrigen: string = '';
  cuentaDestino: string = '';
  monto: number | null = null;
  fecha: string = '';
  comentario: string = '';
  type: string = '';
  
  // Datos adicionales de las cuentas
  cuentaOrigenIcon: string = '';
  cuentaOrigenColor: string = '';
  cuentaDestinoIcon: string = '';
  cuentaDestinoColor: string = '';

  constructor(
    private navService: NavigationService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state || window.history.state;
    
    console.log('=== DETAIL TRANSFER - State recibido ===');
    console.log('Navigation extras state:', navigation?.extras?.state);
    console.log('Window history state:', window.history.state);
    console.log('State final:', state);
    console.log('transferData:', state?.transferData);
    
    if (state?.transferData) {
      this.loadTransferData(state.transferData);
      localStorage.removeItem('transferDetail');
    } else {
      console.log('⚠️ No se recibió transferData en el state, intentando localStorage...');
      const storedData = localStorage.getItem('transferDetail');
      if (storedData) {
        console.log('✅ Datos recuperados desde localStorage');
        const transfer = JSON.parse(storedData);
        this.loadTransferData(transfer);
        localStorage.removeItem('transferDetail');
      } else {
        console.error('❌ No hay datos disponibles ni en state ni en localStorage');
      }
    }
  }

  private loadTransferData(transfer: any) {
    console.log('=== CARGANDO DATOS DE TRANSFERENCIA ===');
    console.log('Transfer recibido:', transfer);
    
    this.transferId = transfer.id;
    this.cuentaOrigen = transfer.originAccountName || '';
    this.cuentaDestino = transfer.destinationAccountName || '';
    this.monto = transfer.amount;
    this.fecha = transfer.date || '';
    this.comentario = transfer.comment || '';
    this.type = transfer.type || '';
    
    // Cargar icono y color de las cuentas
    this.cuentaOrigenIcon = transfer.originAccountIcon || '';
    this.cuentaOrigenColor = transfer.originAccountColor || '';
    this.cuentaDestinoIcon = transfer.destinationAccountIcon || '';
    this.cuentaDestinoColor = transfer.destinationAccountColor || '';
    
    console.log('Datos cargados:', {
      transferId: this.transferId,
      cuentaOrigen: this.cuentaOrigen,
      cuentaDestino: this.cuentaDestino,
      monto: this.monto,
      fecha: this.fecha,
      comentario: this.comentario,
      type: this.type,
      cuentaOrigenIcon: this.cuentaOrigenIcon,
      cuentaOrigenColor: this.cuentaOrigenColor,
      cuentaDestinoIcon: this.cuentaDestinoIcon,
      cuentaDestinoColor: this.cuentaDestinoColor
    });
  }

  backToCategories() {
    (document.activeElement as HTMLElement)?.blur();
    this.navService.back();
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getTransferTypeLabel(): string {
    switch(this.type) {
      case 'Inicial':
        return 'Monto Inicial';
      case 'Ajuste':
        return 'Ajuste del Monto';
      case 'Realizado':
        return 'Transferencia Realizada';
      default:
        return 'Transferencia';
    }
  }

  editarTransferencia() {
    // Navegar a la página de edición con los datos de la transferencia
    const transferData = {
      id: this.transferId,
      originAccountId: null, // Estos IDs deberían venir del backend
      destinationAccountId: null,
      amount: this.monto,
      date: this.fecha,
      comment: this.comentario,
      type: this.type,
      originAccountName: this.cuentaOrigen,
      destinationAccountName: this.cuentaDestino,
      originAccountIcon: this.cuentaOrigenIcon,
      originAccountColor: this.cuentaOrigenColor,
      destinationAccountIcon: this.cuentaDestinoIcon,
      destinationAccountColor: this.cuentaDestinoColor
    };
    
    localStorage.setItem('editTransfer', JSON.stringify(transferData));
    this.navService.push('/accounts/new-transfer', { transferData, isEdit: true });
  }

  async eliminarTransferencia() {
    // Aquí deberías agregar un diálogo de confirmación
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta transferencia?');
    if (confirmDelete) {
      // TODO: Implementar la lógica de eliminación con el servicio correspondiente
      console.log('Eliminando transferencia con ID:', this.transferId);
      // Después de eliminar, volver atrás
      this.navService.back();
    }
  }

}
