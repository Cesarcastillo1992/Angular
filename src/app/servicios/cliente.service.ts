import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient ) { }

  loadClientes(tipo: string, documento: number): Observable<Cliente> {
    return this.http.get<Cliente>(`http://localhost:8090/user/info?tipoDocumento=${tipo}&numeroDocumento=${documento}`);
  }
}
