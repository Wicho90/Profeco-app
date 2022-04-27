import { Component, OnInit } from '@angular/core';
import { Producto } from './producto';
import { ProductoService } from '../services/producto.service';
import { ModalService } from '../services/modal.service';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {
  
  productos: Producto[];
  paginador: any;
  productoSeleccionado:Producto;
  
  constructor(private productoService : ProductoService,
    private modalService:ModalService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.productoService.getProductos(page)
        .subscribe(response => {this.productos = response.content as Producto[];
          this.paginador = response;
        }
          );
    });

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

  abrirModal(producto:Producto){
    this.productoSeleccionado = producto;
    this.modalService.abrirModal();
  }

}
