import { UsuariorestComponent } from './restaurando/usuariorest/usuariorest.component';
import { FacultadComponent } from './restaurando/facultad/facultad.component';
import { UnidadComponent } from './restaurando/unidad/unidad.component';
import { RolusuarioComponent } from './restaurando/rolusuario/rolusuario.component';
import { RestaurarComponent } from './restaurar/restaurar.component';
import { FacultadEditComponent } from './edits/facultad-edit/facultad-edit.component';
import { ListaFacultadesComponent } from './lista-facultades/lista-facultades.component';
import { RegistroFacultadComponent } from './registro-facultad/registro-facultad.component';
import { DetallePresupuesto2Component } from './detalle-presupuesto2/detalle-presupuesto2.component';
import { SeleccioneAnioComponent } from './presupuesto-actual/seleccione-anio/seleccione-anio.component';
import { ListaEmpresasComponent } from './lista-empresas/lista-empresas.component';
import { RegistroEmpresaComponent } from './registros/registro-empresa/registro-empresa.component';
import { JefeComponent } from './jefe/jefe.component';
import { SecretariaComponent } from './secretaria/secretaria.component';
import { CotizadorComponent } from './cotizador/cotizador.component';
import { AdministrativosComponent } from './administrativos/administrativos.component';
import { CotizandoComponent } from './cotizando/cotizando.component';
import { CotizacionesComponent } from './cotizaciones/cotizaciones.component';
import { SolicitudCotizacionComponent } from './solicitud-cotizacion/solicitud-cotizacion.component';
import { MisSolicitudesComponent } from './mis-solicitudes/mis-solicitudes.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './components/items/items.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { UnidadesComponent } from './components/unidades/unidades.component';
import { FormSolicitudComponent } from './form-solicitud/form-solicitud.component';
import { LoginComponent } from './login/login.component';
import { RegistroItemComponent } from './registros/registro-item/registro-item.component';
import { RegistroRolComponent } from './registros/registro-rol/registro-rol.component';
import { RegistroUnidadComponent } from './registros/registro-unidad/registro-unidad.component';
import { RegistroUsuarioComponent } from './registros/registro-usuario/registro-usuario.component';
import { ListaRolesComponent } from './lista-roles/lista-roles.component';
import { RegistroItemSupComponent } from './registros/registro-item-sup/registro-item-sup.component';
import { ItemSupComponent } from './components/item-sup/item-sup.component';
import { ItemSupPresupuestoComponent } from './item-sup-presupuesto/item-sup-presupuesto.component';
import { MenuInicioComponent } from './components/menu-inicio/menu-inicio.component';
import { AuthGuard } from './auth.guard';
import { FechaPresupuestoComponent } from './components/fecha-presupuesto/fecha-presupuesto.component';
import { RedactarInformeComponent } from './components/redactar-informe/redactar-informe.component';
import { RegistroPresupuestoComponent } from './components/registro-presupuesto/registro-presupuesto.component';
import { ListaPresupuestosComponent } from './components/lista-presupuestos/lista-presupuestos.component';
import { InformeCotizadoComponent } from './components/redactar-informe/informe-cotizado/informe-cotizado.component';
import { ItemGenEditComponent } from './edits/item-gen-edit/item-gen-edit.component';
import { ItemSupEditComponent } from './edits/item-sup-edit/item-sup-edit.component';
import { UnidadesEditComponent } from './edits/unidades-edit/unidades-edit.component';
import { EmpresasEditComponent } from './edits/empresas-edit/empresas-edit.component';
import { LogRecordsComponent } from './administrador/log-records/log-records.component';
import { TableroComponent } from './components/tablero/tablero.component';

const routes: Routes = [
  {
    path: 'restUsuarios',
    component: UsuariorestComponent
  },{
    path: 'restFacultades',
    component: FacultadComponent
  },
  {
    path: 'restUnidades',
    component:UnidadComponent
  },
  {
    path: 'restRoles',
    component: RolusuarioComponent
  },
  {
    path: 'restaurar',
    component: RestaurarComponent
  },{
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'editar-facultad/:id',
    component:FacultadEditComponent
  },
  {
    path: 'detallePresupuesto',
    component: DetallePresupuesto2Component
  },
  {
    path: 'listaFacultades',
    component: ListaFacultadesComponent
  }
  ,
  {
    path: 'registroFacultad',
    component: RegistroFacultadComponent
  } 
  ,

  {
    path: 'listaEmpresas',
    component: ListaEmpresasComponent
  },
  {
    path: 'empresa',
    component: RegistroEmpresaComponent
  },
  {
    path: 'usuario',
    component: UsuarioComponent
  },
  {
    path: 'listausuarios',
    component: ListaUsuariosComponent
  },
  {
    path: 'cotizando/:id',
    component: CotizandoComponent
  },
  {
    path: 'form-solicitud',
    component: FormSolicitudComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'administrador',
    component: AdministradorComponent
  },
  {
    path: 'registrounidad',
    component: RegistroUnidadComponent
  },
  {
    path: 'registrousuario',
    component: RegistroUsuarioComponent
  },  
  {
    path: 'registrousuario',
    component: RegistroUsuarioComponent
  },
  {
    path: 'misSolicitudes',
    component: MisSolicitudesComponent
  },{
    path: 'listarol',
    component: ListaRolesComponent
  },
  {
    path: 'registroRol',
    component: RegistroRolComponent 
  },
  {
    path: 'solicitudes',
    component: SolicitudesComponent,

  },
  {
    path: 'registroitem',
    component: RegistroItemComponent
  },
  {
    path: 'items',
    component: ItemsComponent
  },
  {
    path: 'registroitemsup',
    component: RegistroItemSupComponent
  },
  {
    path: 'itemsuperiores',
    component: ItemSupComponent
  },
  {
    path: 'registrounidades',
    component: RegistroUnidadComponent
  },
  {
    path: 'unidades',
    component: UnidadesComponent
  },
  {
    path: 'itemSupPresupuesto',
    component: ItemSupPresupuestoComponent
  },
  {
    path: 'fechaPresupuesto',
    component: FechaPresupuestoComponent,    
    canActivate: [AuthGuard]
  },
  {
    path: 'registropresupuesto',
    component: RegistroPresupuestoComponent,    
    canActivate: [AuthGuard]
  },
  {
    path: 'cotizacion',
    component: CotizacionesComponent
  },  
  {
    path: 'presupuestos',
    component: ListaPresupuestosComponent,    
    canActivate: [AuthGuard]
  },
  {
    path: 'solicitudCotizacion',
    component: SolicitudCotizacionComponent
  },
  {
    path: 'usuarios',
    component: AdministrativosComponent,    
    canActivate: [AuthGuard]
  },
  {
    path: 'cotizador',
    component: CotizadorComponent,    
    canActivate: [AuthGuard]
  },
  {
    path:'redactar-informe/:id',
    component:RedactarInformeComponent
  },
  {
    path:'informe-cotizado/:id',
    component:InformeCotizadoComponent
  },
  {
    path: 'jefe',
    component: JefeComponent
  },
  {
    path: 'secretaria',
    component: SecretariaComponent
  },
  {
    path: 'editar-item/:id',
    component: ItemGenEditComponent
  },
  {
    path: 'editar-item-superior/:id',
    component: ItemSupEditComponent
  },
  {
    path: 'editar-unidad/:id',
    component: UnidadesEditComponent
  },
  {
    path: 'editar-empresa/:id',
    component: EmpresasEditComponent
  },
  {
    path: 'log-records',
    component: LogRecordsComponent
  },
  {
    path: 'tablero',
    component: TableroComponent
  },
  {
    path: 'cotizacion', 
    loadChildren: () => import('./registros/cotizacion-items/cotizacion-items.module').then(m => m.CotizacionItemsModule)
  },
  { path: '**', component: MenuInicioComponent },
  { path: '', component: MenuInicioComponent }
];

@NgModule({
  //RouterModule.forRoot(routes)
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
