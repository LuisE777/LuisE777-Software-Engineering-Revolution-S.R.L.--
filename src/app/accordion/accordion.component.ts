import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../services/login.service';
export type Config = {
  multi?: boolean
};
export type Menu = {
  name: string,
  iconClass: string,
  active: boolean,
  submenu: { name: string, url: string }[]
}
@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {
  @Input() public menuEspecifico: string;
  @Input() public privilegios: any = window.localStorage.getItem("privilegios");
  privilegios_json: any = JSON.parse("{\"admin\":false,\"jefe\":false,\"cotizador\":false,\"usuario\":false}");
  token: string = "null";
  message: string;
  subscription: Subscription;
  link: string = "";
  config: Config;
  options: Config = { multi: false };
  menus: Menu[] = [];
  menuAdmin: Menu[] = [
    {
      name: 'Registros',
      iconClass: 'save',
      active: false,
      submenu: [
        { name: 'Registrar usuario', url: '/registrousuario' },
        { name: 'Registrar rol', url: "/registroRol" },
        { name: 'Registrar unidad', url: "/registrounidades" },
        { name: 'Registrar presupuesto ', url: "/registropresupuesto" },
        { name: 'Registrar item especifico', url: "/registroitem" },
        { name: 'Registrar item general', url: "/registroitemsup" },
        { name: 'Registrar facultad', url: "/registroFacultad" },
        { name: 'Habilitar fecha de registro de presupuestos', url: "/fechaPresupuesto" },
      ]
    },
    {
      name: 'Listas',
      iconClass: 'list',
      active: false,
      submenu: [
        { name: 'Lista de usuarios ', url: '/listausuarios' },
        { name: 'Lista de roles ', url: '/listarol' },
        { name: 'Lista de unidades de gasto ', url: '/unidades' },
        { name: 'Lista de items especificos ', url: '/items' },
        { name: 'Lista de items generales', url: '/itemsuperiores' },
        { name: 'Lista de presupuestos', url: '/presupuestos' },
        { name: 'Lista de facultades', url: '/listaFacultades' },
      ]
    }, {
      name: 'Registros del sistema',
      iconClass: 'file_present',
      active: false,
      submenu: [
        { name: 'Bitacora & Restauracion', url: '/log-records' },
        { name: 'Habilitación de datos eliminados', url: '/restaurar' }
      ]
    }
  ];
  menuJefe: Menu[] = [
    {
      name: 'Solicitudes',
      iconClass: 'request_quote',
      active: false,
      submenu: [
        { name: 'Realizar solicitud', url: '/form-solicitud' },
        { name: 'Ver mis solicitudes', url: "/misSolicitudes" },
      ]
    },
    {
      name: 'Unidades',
      iconClass: 'business',
      active: false,
      submenu: [
        { name: 'Registrar unidad', url: '/registrounidades' },
      ]
    }
  ];
  menuCotizador: Menu[] = [
    {
      name: 'Solicitudes',
      iconClass: 'request_quote',
      active: false,
      submenu: [
        { name: 'Solicitudes nuevas', url: '/solicitudes' },
        { name: 'Cotizaciones', url: "/cotizacion" },
      ]
    },
    {
      name: 'Empresas',
      iconClass: 'business',
      active: false,
      submenu: [
        { name: 'Registrar empresa', url: '/empresa' },
        { name: 'Lista de empresas', url: "/listaEmpresas" },
      ]
    }
  ];
  menuAdministrativo: Menu[] = [
    {
      name: 'Solicitudes',
      iconClass: 'request_quote',
      active: false,
      submenu: [
        { name: 'Realizar solicitud', url: '/form-solicitud' },
        { name: 'Ver mis solicitudes', url: "/misSolicitudes" },
      ]
    }];
  constructor(private router: Router, private loginService: LoginService) {
    this.getPrivilegios();
    this.config = this.mergeConfig(this.options);
    this.privilegios = window.localStorage.getItem("privilegios");
  }
  ngOnInit(): void {
    this.verificarToken();
    this.subscription = this.loginService.currentMessage.subscribe(message => this.message = message);
  }
  loop() {
    this.getPrivilegios();
    return false;
  }
  getPrivilegios() {
    if (localStorage.getItem('privilegios')) {
      try {
        this.privilegios = localStorage.getItem('privilegios');
        this.privilegios_json = JSON.parse(this.privilegios);
      } catch (error) {
        console.log(error)
      }
    } else {
    }
  }
  mergeConfig(options: Config) {
    const config = {
      multi: true
    };
    return { ...config, ...options };
  }
  toggle(index: number, menus: Menu[]) {
    if (!this.config.multi) {
      menus.filter(
        (menu, i) => i !== index && menu.active
      ).forEach(menu => menu.active = !menu.active);
    }
    menus[index].active = !menus[index].active;
  }
  verificarToken() {
    let today = new Date();
    this.token = localStorage.getItem("token") + "";
    let d = new Date(0);
    if (this.token != "null") {
      try {
        var exp = JSON.parse(atob(this.token.split('.')[1])).exp;
        d.setUTCSeconds(exp);
      } catch (error) {
        console.log(error);
      }
    }
    d.setHours(d.getHours() + 2);
    d.setMinutes(d.getMinutes() + 23);
    d.setSeconds(d.getSeconds() + 15);
    if (this.token == "null" || d < today) {
      this.loginService.changeMessage("Su cuenta se cerro por que la sesión expiro.")
      localStorage.clear();
      this.router.navigate(['/login']);
    } else {
    }
    return false;
  }
}
