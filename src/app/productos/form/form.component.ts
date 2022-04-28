import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { Mercado } from '../mercado';
import { ProductoService } from '../../services/producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl:'./form.component.html',
  styleUrls: ['./form.component.css']
  
})
export class FormComponent implements OnInit {
  public producto: Producto = new Producto;
  public mercados: Mercado[];
  public titulo: string = 'Crear Producto';
  public errores: string[];
  constructor(private productoService: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarProducto()
  }
  
  cargarProducto(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){                                  //producto consulta | producto de actual   
        this.productoService.getProducto(id).subscribe( (producto) => this.producto = producto)
      }
    });
    this.productoService.getMercados().subscribe(mercados => this.mercados = mercados);
  }

  public create(): void{
    this.productoService.create(this.producto)
    .subscribe(json => {
      this.router.navigate(['/productos'])
      swal('Nuevo producto',`${json.mensaje}: ${json.producto.nombre}` , 'success')
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error('Codigo del error desde el backend: ' + err.status);
      console.error( err.error.errors);
    }
    );
  }

  update():void{
    this.productoService.update(this.producto)
    .subscribe(json =>{
      this.router.navigate(['/productos'])
      swal('Producto Actualizado',`${json.mensaje}: ${json.producto.nombre}` , 'success');

    },
    err => {
      this.errores = err.error.errors as string[];
      console.error('Codigo del error desde el backend: ' + err.status);
      console.error( err.error.errors);
    }
    );
  }

  compararMercado(o1: Mercado, o2: Mercado):boolean {
    if  (o1 === undefined && o2 === undefined){
      return true;
    }
    return  o1 === null || o2 === null || o1 === undefined || o2 === undefined? false : o1.id === o2.id;
  }

}
