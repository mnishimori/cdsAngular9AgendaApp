import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contato } from './contato/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  urlBase = environment.apiBaseUrl + '/contatos';

  constructor(
    private http: HttpClient
  ) { }

  create(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.urlBase, contato);
  }
}
