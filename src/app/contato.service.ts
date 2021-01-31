import { environment } from './../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contato } from './contato/contato';
import { PaginaContato } from './contato/pagina-contato';

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

  read(page: any, size: any): Observable<PaginaContato> {
    const params = new HttpParams()
    .set('page', page)
    .set('size', size)
    .set('sort', 'id');
    return this.http.get<any>(this.urlBase + '/lista-paginada?' + params.toString());
  }

  favorite(contato: Contato): Observable<any> {
    return this.http.put<any>(`${this.urlBase}/favorito/${contato.id}`, null);
  }

  upload(contato: Contato, formData: FormData): Observable<any> {
    return this.http.put(`${this.urlBase}/${contato.id}/foto`, formData, { responseType : 'blob'});
  }


}
