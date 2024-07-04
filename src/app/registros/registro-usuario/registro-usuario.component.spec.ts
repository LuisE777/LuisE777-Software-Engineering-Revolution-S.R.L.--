/*imports los paquetes usados en el componente original, necesarios 
para recrearlo en el entorno de prueba */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroUsuarioComponent } from './registro-usuario.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { ImportsNotUsedAsValues } from 'typescript';
/*describe() para aglutinar una batería de tests. */
//describe Un texto que describe la prueba y se muestra en los resultados
describe('RegistroUsuarioComponent', () => {
  let component: RegistroUsuarioComponent;
  let fixture: ComponentFixture<RegistroUsuarioComponent>;
/*beforeEach Un bloque de código que se ejecuta antes de cada una de las pruebas, 
  esto permite crear un entorno independiente, encapsulado y realista de la aplicación.
 En este bloque puedes encontrar una variable llamada “component” que es una instancia 
 del componente que examinaremos,
a través de ella invocaremos las variables y métodos del componente. */
/*que es la zona del setup donde configuramos todo para que se cree antes de cada test */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      /*declarations los elementos que forman parte del código,
       en este caso el paquete de nuestro componente.*/
      declarations: [ RegistroUsuarioComponent ],
      imports:[FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  /*it esta es la prueba en sí, está compuesto por una breve descripción 
  de lo que evalúa y un bloque de código que sera ejecutado para examinar 
  un elemento o conducta en particular.*/
  /* it() se usa para encapsular cada test. expect() es donde se pone la afirmación.  */
  it('debe comenzar con un usuario logeado', () => {
    /* expect() es donde se pone la afirmación */
    /*Los Matchers son expresiones que dan lógica a la afirmación: 
    toBe() significa que lo actual sea lo esperado. 
    toContain() que lo actual posea lo esperado. */
    expect(component).toBeTruthy();
  });
  /*it('debe  comenzar con el usuario desactivado' , () => {
     expect(component.usuarioActivo).toBeFalsy();}); */
  /*En este código queremos verificar que la variable “usuarioActivo”
    este declarada y tenga un valor de “FALSE” al momento de iniciar la aplicación. */
  /*it('debe activar el usuario', () => {
    component.activarUsuario();
    expect(component.usuarioActivo).toBeTruthy();
  }); */
  /*En este caso estamos examinando que después ejecutar el método usuarioActivo(),
   el valor de la variable usuarioActivo pase a ser “TRUE” */
   /* Karma es el programa que nos ejecuta los tests en el navegador 
   e informa de los resultados y nos permite depurar: */
});
