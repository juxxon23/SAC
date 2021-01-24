import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpToolService {

  constructor(public http: HttpClient) { }

  getRequest(url: string, data?: any, token?: string){
    const config: any = {
      responseType: 'json',
    };
    if (token){
      const header = new HttpHeaders().set('Authorizaton', `Bearer${token}`);
      config.headers = header;
    }
    if (data) {
      const header = new HttpHeaders().set('id_a', data);
      config.headers = header;
      console.log(config);
    }
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

	deleteData(url:string, dataEx?:any) {
		return this.http.delete(url, {
			params: {
				id: dataEx
			}
		});
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
