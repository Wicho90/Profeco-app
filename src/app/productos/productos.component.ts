import { Component, OnInit } from '@angular/core';
import { Producto } from './producto';
import { ProductoService } from '../services/producto.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {
  
  productos: Producto[];
  
  constructor(private productoService : ProductoService) { }

  ngOnInit(): void {
   this.productoService.getProductos().subscribe(
     (productos) => {
       this.productos = productos
    }
   );

   
  }

  delete(productos: Producto): void{
    
    
    swal({
      title: '¿Estas seguro?',
      text: `¿Seguro que desea eliminar al producto ${productos.nombre} ${productos.precio}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling:false,
      reverseButtons: true

    }).then((result) => {
      if (result.value) {
        this.productoService.delete(productos.id).subscribe(
          response => {
            this.productos =this.productos.filter(cli => cli !== productos)
            swal(
              'Producto Eliminado',
              `Producto ${productos.nombre} eliminado con éxito`,
              'success'
            )
          }
        )
        
      }
    })
  }

}
