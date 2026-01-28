import { Component, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { NavigationService } from "src/app/core/services/navigation.service";
import { Router } from "@angular/router";
import { DeleteTransferUseCase } from "src/app/core/use-cases/transfer/delete-transfer.usecase";
import { SpinnerService } from "src/app/core/services/spinnerService.service";
import { CustomAlertComponent } from "../../../../shared/components/custom-alert/custom-alert.component";

@Component({
  selector: "app-detail-transfer",
  templateUrl: "./detail-transfer.page.html",
  styleUrls: ["./detail-transfer.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, CustomAlertComponent],
})
export class DetailTransferPage implements OnInit {

  title: string = 'Detalle Transferencia';
  
  transferId: number | null = null;
  cuentaOrigenId: number | null = null;
  cuentaDestinoId: number | null = null;
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
  
  showCustomAlert: boolean = false;
  showErrorAlert: boolean = false;
  messageError: string = '';

  constructor(
    private navService: NavigationService,
    private router: Router,
    private deleteTransferUseCase: DeleteTransferUseCase,
    private loadingService: SpinnerService
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
    this.cuentaOrigenId = transfer.originAccountId || null;
    this.cuentaDestinoId = transfer.destinationAccountId || null;
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
      cuentaOrigenId: this.cuentaOrigenId,
      cuentaDestinoId: this.cuentaDestinoId,
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
    
    // Extraer directamente del string para evitar problemas de zona horaria
    const parts = dateString.split('T')[0].split('-');
    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const month = months[monthIndex];
    
    return `${day} de ${month} del ${year}`;
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
    // Desenfocar el elemento activo antes de navegar
    (document.activeElement as HTMLElement)?.blur();
    
    // Navegar a la página de edición con los datos de la transferencia
    const transferData = {
      id: this.transferId,
      originAccountId: this.cuentaOrigenId,
      destinationAccountId: this.cuentaDestinoId,
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
    if (!this.transferId) {
      console.error('No hay ID de transferencia para eliminar');
      return;
    }

    this.showCustomAlert = true;
  }

  confirmarEliminacion() {
    this.showCustomAlert = false;
    
    if (!this.transferId) return;
    
    this.loadingService.show();
    
    this.deleteTransferUseCase.deleteTransfer({ id: this.transferId }).subscribe({
      next: (result) => {
        this.loadingService.hide();
        
        if (result.success) {
          console.log('✅ Transferencia eliminada exitosamente');
          this.navService.back();
        } else {
          console.error('❌ Error al eliminar transferencia:', result.message);
          this.messageError = result.message || 'Error al eliminar la transferencia';
          this.showErrorAlert = true;
        }
      },
      error: (error) => {
        this.loadingService.hide();
        console.error('❌ Error en la petición:', error);
        this.messageError = 'Ocurrió un error al eliminar la transferencia';
        this.showErrorAlert = true;
      }
    });
  }

  cerrarAlert() {
    this.showCustomAlert = false;
    this.showErrorAlert = false;
  }

}
