import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductoService } from './services/producto.service';
import { FormComponent } from './productos/form/form.component';
import { ClienteComponent } from './cliente/cliente.component';
import { PaginatorcComponent } from './cliente/paginatorc/paginatorc.component';
import { ProComponent } from './pro/pro.component';
import { PaginatorComponent } from './paginator/paginator.component';


import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { FotoComponent } from './productos/foto/foto.component';
registerLocaleData(localeEs, 'es');



const routes:Routes = [
  {path: '',redirectTo: 'productos', pathMatch: 'full'},
  {path: 'productos', component: ProductosComponent},
  {path: 'productos/page/:page', component: ProductosComponent},
  {path: 'productos/form', component: FormComponent},
  {path: 'productos/form/:id', component: FormComponent},
  {path: 'productos/ver/:id', component: FotoComponent},

  {path: 'clientes', component: ClienteComponent},
  {path: 'clientes/page/:page', component: ClienteComponent},
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
    ProComponent,
    PaginatorComponent,
    PaginatorcComponent,
    FotoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ProductoService, {provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
