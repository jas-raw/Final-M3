import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  socket: Socket
  config = environment

  constructor( private http: HttpClient ) { 
    this.socket= io(this.config.url)
  }

  create(data: any){
    return this.http.post(this.config.url+"/api/match/", data)
  }

  update(data: any){
    return this.http.put(this.config.url+"/api/match/", data)
  }

  delete(id: string){
    return this.http.delete(this.config.url+"/api/match/"+id)
  }

  listar(){
      return this.http.get(this.config.url+"/api/match/")
  }

  getMatch(id: string){
    let obj = {_id: id}
    this.socket.emit('get', obj)
  }

  addEvent(obj: any){
    this.socket.emit('events', obj)
  }

  match(){
      return new Observable((observer) => {
          this.socket.on('match',(list: any) =>{
              observer.next(list)
          })
      })
  }
}
