import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  config = environment

  constructor( private http: HttpClient ) { 
  }

  create(data: any){
    return this.http.post(this.config.url+"/api/user/", data)
  }

  update(data: any){
    return this.http.put(this.config.url+"/api/user/", data)
  }

  delete(id: string){
    return this.http.delete(this.config.url+"/api/user/"+id)
  }

  listar(){
      return this.http.get(this.config.url+"/api/user/")
  }
}
