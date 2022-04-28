import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Producto } from '../productos/producto';
import { Mercado } from '../productos/mercado';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of,Observable, throwError } from 'rxjs';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private urlEndPoint: string = 'http://localhost:5050/api/productos';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getMercados(): Observable<Mercado[]> {
    return this.http.get<Mercado[]>(this.urlEndPoint + '/mercados');
  }

  getProductos(page: number): Observable<any>{ 
      return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
        map( (response: any) =>{ 
          
           (response.content as Producto[]).map(producto =>{
            let dataPipe = new DatePipe('es');
            //producto.createAt = dataPipe.transform(producto.createAt,'EEEE dd, MMMM yyy');
            return producto;
          });

          return response;
        }
        
        )
      );   
    
  }

  //Al agragar un producto en el api rest este retonar el producto creado
  create(producto:Producto) : Observable<any>{
    return this.http.post<any>(this.urlEndPoint, producto, {headers: this.httpHeaders} ).pipe(
      catchError(e => {
        
        if(e.status==400){
          return throwError( () => e );
        }

        console.error(e.error.mensaje);
        swal(e.error.mensaje , e.error.error, 'error');
        return throwError( () => e );
      })
    );

  }

  getProducto(id): Observable<Producto>{
    return this.http.get<Producto>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e =>{
        this.router.navigate(['/productos']);
        console.error( e.error.mensaje);
        swal('Error al editar', e.error.mensaje,"error");
        return throwError( () => e );
      })
    );
  }

  update(producto:Producto):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${producto.id}`,producto, {headers: this.httpHeaders}).pipe(
      catchError(e => {

        if(e.status==400){
          return throwError( () => e );
        }

        console.error(e.error.mensaje);
        swal(e.error.mensaje , e.error.error, 'error');
        return throwError( () => e );
      })
    );
  }

  delete(id:number):Observable<Producto>{
    return this.http.delete<Producto>(`${this.urlEndPoint}/${id}`,{headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal(e.error.mensaje , e.error.error, 'error');
        return throwError( () => e );
      })
    );
  }

  subirFoto(archivo: File, id):Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("archivo",archivo);
    formData.append("id",id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });
    
    return this.http.request(req);
  }

}
