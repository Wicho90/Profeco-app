import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../../services/producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl:'./form.component.html',
  
})
export class FormComponent implements OnInit {
  public producto:Producto = new Producto;
  public titulo:string = 'Crear Producto';
  constructor(private productoService: ProductoService,
    private router: Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarProducto()
  }
  
  cargarProducto(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){                                  //producto consulta | producto de actual   
        this.productoService.getProducto(id).subscribe( (producto) => this.producto = producto)
      }
    })
  }

  public create(): void{
    this.productoService.create(this.producto)
    .subscribe(json => {
      this.router.navigate(['/productos'])
      swal('Nuevo producto',`${json.mensaje}: ${json.producto.nombre}` , 'success')
    }
    );
  }

  update():void{
    this.productoService.update(this.producto)
    .subscribe(json =>{
      this.router.navigate(['/productos'])
      swal('Producto Actualizado',`${json.mensaje}: ${json.producto.nombre}` , 'success');

    });
  }

}
