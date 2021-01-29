import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JsonManagerService {

  constructor(public http: HttpClient) { }

	/* Get */
	getData(url:string, token?:any) {
		return this.http.get(url, {
			headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
			withCredentials:true
		});
	}

	/* Post con Json */
	postData(url:string, dataEx:any) {
		return this.http.post(url, dataEx);
	}

	/* Put con Json */
	updateData(url:string, dataEx:any) {
		return this.http.put(url,dataEx);
	}

	/* Delete con parametros de consulta */
	deleteData(url:string, dataEx?:any) {
		return this.http.delete(url, {
			params: {
				id: dataEx
			}
		});
	}

	/* Get con parametros de consulta */
	getState(url:string, user:string, passclient:string) {
		return this.http.get(url, {
			params: {
				'idclient' : user,
				'passclient' : passclient
			}
		})
	}
}
