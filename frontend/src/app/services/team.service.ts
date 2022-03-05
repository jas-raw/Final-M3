import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  config = environment

  constructor( private http: HttpClient ) { 
  }

  create(data: any){
    return this.http.post(this.config.url+"/api/team/", data)
  }

  update(data: any){
    return this.http.put(this.config.url+"/api/team/", data)
  }

  delete(id: string){
    return this.http.delete(this.config.url+"/api/team/"+id)
  }

  listar(){
      return this.http.get(this.config.url+"/api/team/")
  }
}
