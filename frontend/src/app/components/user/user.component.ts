import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  name: string = ""
  username: string = ""
  password: string = ""
  rol: string = "Basic"
  list: Array<any> | undefined = []
  id: string = ""
  disablePass: boolean = false

  constructor(private service: UserService) {
    this.listar()
  }

  ngOnInit(): void {
  }

  async crear(){
    const data = {
      name: this.name, 
      username: this.username,
      rol: this.rol,
      password: this.password
    }
    await this.service.create(data)
    this.cancelar()
  }

  async actualizar(){
    const data = {
      _id: this.id,
      name: this.name, 
      username: this.username,
      rol: this.rol
    }
    this.disablePass= true
    await this.service.update(data).subscribe( async (data: any) => {
      this.listar()
      this.cancelar()
    })
  }

  async eliminar(i: number){
    const id = this.list?.[i]._id
    await this.service.delete(id).subscribe( async (data: any) => {
      this.listar()
    })
  }

  editar(i: number){
    const data = {...this.list?.[i]}
    this.id = data._id
    this.name = data.name
    this.username = data.username
    this.rol = data.rol
  }

  cancelar(){
    this.id = ""
    this.name = ""
    this.username = ""
    this.rol = ""
    this.password = ""
    this.disablePass= false
  }

  listar(){
    this.service.listar().subscribe(data => {
      this.list = data as any[]
    })
  }

}
