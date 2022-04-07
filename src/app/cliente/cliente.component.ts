import { Component, OnInit } from '@angular/core';
import { Producto } from '../productos/producto';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit {
  
  productos: Producto[];
  constructor( private productoService:ProductoService) { }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(
      (productos) => {
        this.productos = productos
        console.log(this.productos);
     }
    );

    
  }

  

}
