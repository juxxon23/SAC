import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpToolService {

  constructor(public http: HttpClient) { }

  getRequest(url: string, id_u?: any, id_a?: any, token?: string){
    const config: any = {
      responseType: 'json',
    };
    let header = new HttpHeaders();
    if (token){
      header = header.append('Authorizaton', `Bearer${token}`);
    }
    if (id_u) {
      header = header.set('id_u', id_u);
    }
    if (id_a) {
      header = header.set('id_a', id_a);  
    }
    config.headers = header;
    return this.http.get(url, config);
  }


  postRequest(url: string, dataEx: any, token?: string){
    const config: any = {
      responseType: 'json'
    };
    if (token){
      const header = new HttpHeaders().set('Authorizaton', `Bearer${token}`);
      config.headers = header;
    }
    return this.http.post(url, dataEx, config);
  }

	deleteRequest(url:string, i?:any) {
    const config: any = {
      responseType: 'json',
    };
    let header = new HttpHeaders();
    if (i) {
      header = header.set('i_req', i);
    }
    config.headers = header;
		return this.http.delete(url, config);
	}

  putRequest(url: string, dataEx: any , token ?: string){
    const config: any = {
      responseType: 'json'
    };
    if (token){
      const header = new HttpHeaders().set('Authorizaton', `Bearer${token}`);
      config.headers = header;
    }
    return this.http.put(url, dataEx, config);
  }
}
