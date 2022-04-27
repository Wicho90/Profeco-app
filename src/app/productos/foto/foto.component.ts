import { Component, OnInit, Input } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { ModalService } from 'src/app/services/modal.service';
import { Producto } from '../producto';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'foto-producto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.css']
})
export class FotoComponent implements OnInit {

  @Input() producto:Producto;
  titulo : string = "Foto producto"
  fotoSeleccionada: File;
  progreso:number = 0;

  constructor(private productoService:ProductoService,
    public modalService:ModalService) { }

  ngOnInit(): void { }

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
    this.progreso = 0;
    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      swal('Error seleccionar imagen: ', 'El archivo debe de ser del tipo imagen', 'error');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto(){
    if(!this.fotoSeleccionada){
      swal('Error Upload: ', 'Debe seleccionar una foto', 'error');
    } else{
      this.productoService.subirFoto(this.fotoSeleccionada, this.producto.id)
      .subscribe(event => {
        
        if(event.type === HttpEventType.UploadProgress){
          this.progreso = Math.round((event.loaded/event.total)*100);
        }else if(event.type === HttpEventType.Response){
          let response:any = event.body;
          this.producto = response.producto as Producto;
          swal('La fot se ha subido completamente!', response.mensaje, 'success');
        }
      });
    }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
  }

}
