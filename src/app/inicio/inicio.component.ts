import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../servicios/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  imports: [RouterOutlet, ReactiveFormsModule, FormsModule, CommonModule],
  standalone: true,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  title = 'PruebaFront';
  tipoDocumento: string = '';
  numeroDocumento: string = '';
  form: FormGroup;
  
  constructor(
    private router: Router, 
    private formBuilder: FormBuilder, 
    private servicioCliente: ClienteService) { 
      this.form = this.formBuilder.group({
      numeroDocumento: new FormControl('', [
      Validators.required, 
      Validators.minLength(8), 
      Validators.maxLength(11) ]),
      tipoDocumento: new FormControl('', Validators.required),
      
    });
  }
  
  buscarCliente() {
    let {tipoDocumento, numeroDocumento} = this.form.value;
    numeroDocumento = numeroDocumento.replace(/\./g, '');
    this.servicioCliente.loadClientes(tipoDocumento, numeroDocumento).subscribe((cliente) =>{
      console.log(cliente);
      if (cliente) {
        localStorage.setItem('clienteData', JSON.stringify(cliente));
        this.router.navigate(['/resumen']);
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Cliente no encontrado',
          text: 'No se encontraron datos del cliente.',
        });
      }  
    });
  }

  formatNumeroDocumento() {
    let {numeroDocumento} = this.form.value;
    if (numeroDocumento >= 0){
      let valor = numeroDocumento.replace(/\D/g, '');
      this.form.get('numeroDocumento')?.setValue(valor.replace(/\B(?=(\d{3})+(?!\d))/g, '.'))

    }
  }

}
