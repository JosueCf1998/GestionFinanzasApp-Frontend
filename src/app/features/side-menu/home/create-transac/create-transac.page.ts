import { Component, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NavigationService } from "src/app/core/services/navigation.service";

@Component({
  selector: "app-create-transac",
  templateUrl: "./create-transac.page.html",
  styleUrls: ["./create-transac.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CreateTransacPage implements OnInit {
  segmentoSeleccionado = 'ingresos';
  monto = 0;
  moneda = 'PEN';
  cuentaSeleccionada = '';
  categoriaSeleccionada: any = null;
  fecha = new Date().toISOString();
  fechaSeleccionada = 'hoy';
  comentario = '';

  categoriasIngresos = [
    { id: 1, nombre: 'Salario', icono: 'salary', color: '#1976d2' },
    { id: 2, nombre: 'Regalo', icono: 'gift', color: '#ad1457' },
    { id: 3, nombre: 'Interés', icono: 'bank', color: '#388e3c' },
    { id: 4, nombre: 'Otros', icono: 'question', color: '#616161' }
  ];

  categoriasGastos: any[] = [];

  constructor(private navService: NavigationService) {}

  ngOnInit() {
    this.setFechaHoy();
  }

  cambiarTipo(tipo: string) {
    this.segmentoSeleccionado = tipo;
    this.categoriaSeleccionada = null;
  }

  cambiarSegmento(event: any) {
    this.segmentoSeleccionado = event.detail.value;
    this.categoriaSeleccionada = null;
  }

  obtenerCategorias() {
    return this.segmentoSeleccionado === 'ingresos' 
      ? this.categoriasIngresos 
      : this.categoriasGastos;
  }

  seleccionarCategoria(categoria: any) {
    this.categoriaSeleccionada = categoria;
  }

  abrirCalculadora() {
    // TODO: Implementar calculadora
  }

  seleccionarCuenta() {
    // TODO: Implementar selector de cuenta
  }

  setFechaHoy() {
    this.fecha = new Date().toISOString();
    this.fechaSeleccionada = 'hoy';
  }

  setFechaAyer() {
    const ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);
    this.fecha = ayer.toISOString();
    this.fechaSeleccionada = 'ayer';
  }

  setFechaUltimo() {
    this.fechaSeleccionada = 'ultimo';
    // TODO: Implementar selección de última fecha usada
  }

  abrirCalendario() {
    // TODO: Implementar selector de calendario
  }

  crearTransaccion() {
    if (!this.monto || this.monto <= 0) {
      console.warn('Monto inválido');
      return;
    }

    if (!this.categoriaSeleccionada) {
      console.warn('Debe seleccionar una categoría');
      return;
    }

    const transaccion = {
      tipo: this.segmentoSeleccionado,
      monto: this.monto,
      moneda: this.moneda,
      cuenta: this.cuentaSeleccionada,
      categoria: this.categoriaSeleccionada,
      fecha: this.fecha,
      comentario: this.comentario
    };

    console.log('Crear transacción:', transaccion);
    // TODO: Llamar al servicio para guardar la transacción
  }

  backToCategories() {
    this.navService.back();
  }
}
