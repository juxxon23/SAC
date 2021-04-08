import { Injectable } from '@angular/core';
import * as M from 'node_modules/materialize-css/dist/js/materialize.min.js';

@Injectable({
  providedIn: 'root'
})
export class HomeAlertsService {

  constructor() { }

  public AlertEditRequest(status) {
    let edit_request_error = status;
    switch (edit_request_error['status']) {
      case 'welcome':
        M.toast('Solicitud de edicion enviada.', 4000)
        break;
    }

    switch (edit_request_error.error['status']) {
      case 'error':
        M.toast('Error en el envio de solicitud de edicion intente mas tarde.', 4000)
      case 'exception':
        M.toast('Excepcion.', 4000);
        break;
    }
  }

  public AlertCreateActa(status) {
    let createActa = status;

    switch (createActa['status']) {
      case 'ok':
        M.toast('Acta creada exitosamente.', 4000)
        break;
    }

    switch (createActa.error['status']) {
      case 'error':
        M.toast('Error: a la hora de crear el acta intente mas tarde.', 4000)
        break;
      case 'exception':
        M.toast('Excepcion.', 4000)
        break;
      default:
        break;
    }
  }

  public AlertSaveActa(status) {
    let saveActa = status;
    switch (saveActa['status']) {
      case 'ok':
        M.toast('Guardada exitosamente.', 4000)
        break;
    }

    switch (saveActa.error['status']) {
      case 'validation_error':
        M.toast('Error: no ha creado un acta.', 4000)
        break;
      default:
        break;
    }
  }

  public AlertSearchActa(status) {
    let searchActa = status;
    switch (searchActa['status']) {
      case 'ok':
        M.toast('Busqueda realizada exitosamente.', 4000)
        break;
    }

    switch (searchActa.error['status']) {
      case 'error':
        M.toast('Error: el acta no existe o especifique su busqueda.', 4000)
        break;
    
      case 'user':
        M.toast('Error: el usuario no existe.', 4000)
        break;

      case 'exception':
        M.toast('No puede ingresar letras para buscar por No. Acta, Ingrese numeros.', 4000)
    }
  }
}
