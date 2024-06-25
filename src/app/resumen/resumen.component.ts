import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Cliente } from '../interfaces/cliente.interface';

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.css'
})
export class ResumenComponent implements OnInit {
  clienteData !: Cliente;

  constructor(private router: Router) { 
    
  }

  ngOnInit() {
    const storedData = localStorage.getItem('clienteData');
    if (storedData) {
      this.clienteData = storedData ? JSON.parse(storedData) : null;
    }
  }

  volver() {
    localStorage.removeItem('clienteData');
    this.router.navigate(['/']);
  }
}
