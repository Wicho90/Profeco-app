import { Component } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
    
})
export class HeaderComponent {
title:string = 'Profeco App';


buscarProducto(termino:string){
console.log(termino);
}

}