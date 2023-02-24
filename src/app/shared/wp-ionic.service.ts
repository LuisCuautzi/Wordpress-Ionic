import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class WpIonicService {

  endpoint = `http://localhost/wordpress/wp-json/wp/v2/`; // funciona bien es la API de WP Localhost
  endpoint1 = `https://despertadorlavalle.com.ar/wp-json/wp/v2/`;// funciona bien 
  endpoint2 = `https://blackamericaweb.com/wp-json/wp/v2/`; // funciona bien
  endpoint3 = `https://www.wired.com/wp-json/wp/v2/`; //  funciona bien, los detalles estan bloqueados por el autor
  endpoint4 = `https://boingboing.net/wp-json/wp/v2/`;// no funciona tiene bloqueo de CORS 
  endpoint5 = `https://quo.eldiario.es/wp-json/wp/v2/`; // funciona bien 
  endpoint6 = `https://variety.com/wp-json/wp/v2/`; // si funciona
  endpoint7 = `https://central.wordcamp.org/wp-json/wp/v2/`; // si funciona pero no muestra las imagenes ya que no tiene images que mostrar
  endpoint8 = `https://quo.eldiario.es/wp-json/wp/v2/`; // si funciona 
  URL       = `https://jsonplaceholder.typicode.com/photos/`;// si funciona pero son fotos de colores
  allPosts = null;
  pages: any;

  constructor( private httpClient: HttpClient) { }

  getAllPosts(page = 1): Observable<any[]> {
    let options = {
      observe: "response" as 'body',
      params: {
        per_page: '40',
        page: ''+page
      }
    };
    return this.httpClient.get<any>(`${this.endpoint1}posts/?_embed`, options)
    .pipe(
      map(res => {
        this.pages = res['headers'].get('X-WP-TOTALPAGES');
        this.allPosts = res['headers'].get('X-WP-TOTAL');
        return res['body'];
      })
    )
  }

  postDetails(id: any) 
  {
    return this.httpClient.get(`${this.endpoint1}posts/${id}?_embed`)
    .pipe(
      map((post) => {
        return post;
      }) 
    )
  }

  hasMorePosts() 
  {
    return this.pages;
  }
}