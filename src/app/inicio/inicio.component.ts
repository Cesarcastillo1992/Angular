import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../servicios/cliente.service';

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
  clientes: any[] = [];
  form: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private servicioCliente: ClienteService) { 
    this.form = this.formBuilder.group({
      numeroDocumento: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(11) ] ),
      tipoDocumento: new FormControl('', Validators.required),
      
    });
  }
  
  ngOnInit() {
  
  }

  buscarCliente() {
    let {tipoDocumento, numeroDocumento} = this.form.value;
    this.servicioCliente.loadClientes(tipoDocumento, numeroDocumento).subscribe((cliente) =>{
      console.log(cliente);
      if (cliente) {
        localStorage.setItem('clienteData', JSON.stringify(cliente));
        this.router.navigate(['/resumen']);
      } else {
        alert('Cliente no encontrado');
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

  removeDots(value: string): string {
    return value.replace(/\./g, '');
  }
}
