import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as M from 'node_modules/materialize-css/dist/js/materialize.min.js';

@Injectable({
  providedIn: 'root'
})
export class UserAlertsService {

  constructor(
    private router: Router
  ) { }

  public alerLogin(error) {
    let login_error = error;
    switch (login_error.error['status']) {
      case 'user':
        M.toast('El usuario no esta registrado', 4000)
        break;
      case 'password':
        M.toast('La contraseña es invalida', 4000)
        break;
      case 'validators':
        for (let i = 0; i < 1; i++) {
          if (login_error.error.error['email_inst']) {
            M.toast('El email es invalido', 4000)
          } if (login_error.error.error['password_u']) {
            M.toast('La contraseña es invalida', 4000)
          }
        }
        break;
      case 'exception':
        M.toast('Exception', 4000)
        break;
      case 'sqlalchemy get_by':
        M.toast('Sqlalchemy Exception', 4000)
        break;
      case 'postgres_tool get_by':
        M.toast('Postgresql Exception', 4000)
        break;
      default:
        M.toast('Unknown Error', 4000)
        break;
    }
  }

  public alertSignin(error) {
    let signin_error = error;
    switch (signin_error.error['status']) {
      case 'user':
        M.toast('El usuario no esta registrado', 4000)
        break;
      case 'validators':
        for (let i = 0; i < 1; i++) {
          if (signin_error.error.error['email_inst']) {
            M.toast('El email debe contener minimo 13 caracteres y maximo 50', 4000)
          } if (signin_error.error.error['document_u']) {
            M.toast('El documento debe contener minimo 3 caracteres y maximo 50 ', 4000)
          } if (signin_error.error.error['password_u']) {
            M.toast('La contraseña debe contener minimo 8 caracteres y maximo 20', 4000)
          }
        }
        break;
      case 'exception':
        M.toast('Exception', 4000)
        this.router.navigate(['/signin']);
        break;
      case 'sqlalchemy get_by':
        M.toast('Sqlalchemy Exception', 4000)
        break;
      case 'postgres_tool get_by':
        M.toast('Postgresql Exception', 4000)
        break;
      default:
        M.toast('Unknown Error', 4000)
        break;
    }
  }

  public alertSigninExtra(error) {
    let signinExtra_error = error;
    switch (signinExtra_error.error['status']) {
      case 'user':
        M.toast('El usuario no esta registrado', 4000)
        break;
      case 'validators':
        for (let i = 0; i < 1; i++) {
          if (signinExtra_error.error.error['name_u']) {
            M.toast('El nombre debe contener minimo 3 caracteres y maximo 30', 4000)
          } if (signinExtra_error.error.error['lastname_u']) {
            M.toast('El apellido debe contener minimo 3 caracteres y maximo 30 ', 4000)
          } if (signinExtra_error.error.error['phone_u']) {
            M.toast('El numero de telefono debe contener minimo 7 caracteres y maximo 10', 4000)
          } if (signinExtra_error.error.error['city_u']) {
            M.toast('La ciudad debe contener minimo 7 caracteres y maximo 10', 4000)
          } if (signinExtra_error.error.error['regional_u']) {
            M.toast('La regional debe contener minimo 7 caracteres y maximo 10', 4000)
          } if (signinExtra_error.error.error['center_u']) {
            M.toast('El centro debe contener minimo 7 caracteres y maximo 10', 4000)
          } if (signinExtra_error.error.error['password_u']) {
            M.toast('La contraseña debe contener minimo 8 caracteres y maximo 20', 4000)
          }
        }
        break;
      case 'exception':
        M.toast('Exception', 4000)
        this.router.navigate(['/signin']);
        break;
      case 'sqlalchemy get_by':
        M.toast('Sqlalchemy Exception', 4000)
        break;
      case 'postgres_tool get_by':
        M.toast('Postgresql Exception', 4000)
        break;
      default:
        M.toast('Unknown Error', 4000)
        break;
    }
  }
}
