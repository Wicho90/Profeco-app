import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../productos/producto';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-pro',
  templateUrl: './pro.component.html'
})
export class ProComponent implements OnInit {
  public producto:Producto = new Producto;

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
        console.log(this.producto.nombre);
      }
    })
  }

}
