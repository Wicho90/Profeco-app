import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { ProductosComponent } from './productos/productos.component';
import { ProductoService } from './services/producto.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './productos/form/form.component';
import { FormsModule } from '@angular/forms';
import { ClienteComponent } from './cliente/cliente.component';
import { ProComponent } from './pro/pro.component';



const routes:Routes = [
  {path: '',redirectTo: 'productos', pathMatch: 'full'},
  {path: 'productos', component: ProductosComponent},
  {path: 'productos/form', component: FormComponent},
  {path: 'productos/form/:id', component: FormComponent},
  {path: 'clientes', component: ClienteComponent},
  {path: 'pro/:id', component: ProComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductosComponent,
    ClienteComponent,
    FormComponent,
    ProComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ProductoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
