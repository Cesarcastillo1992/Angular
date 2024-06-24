import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient ) { }

  loadClientes(tipo: string, documento: number) {
    return this.http.get<any[]>(`http://localhost:8090/user/info?tipoDocumento=${tipo}&numeroDocumento=${documento}`);
  }
}
