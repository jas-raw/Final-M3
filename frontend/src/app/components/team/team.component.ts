import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  name: string = ""
  locale_uniform: string = ""
  visitor_uniform: string = ""
  formation: string = ""
  list: Array<any> | undefined = []
  id: string = ""
  search: string = ""

  constructor(private service: TeamService) {
    this.listar()
  }

  ngOnInit(): void {
  }

  async crear(){
    const data = {
      name: this.name, 
      locale_uniform: this.locale_uniform,
      visitor_uniform: this.visitor_uniform,
      formation: this.formation
    }
    await this.service.create(data)
    this.cancelar()
  }

  async actualizar(){
    const data = {
      _id: this.id,
      name: this.name, 
      locale_uniform: this.locale_uniform,
      visitor_uniform: this.visitor_uniform,
      formation: this.formation
    }
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
    this.locale_uniform = data.locale_uniform
    this.visitor_uniform = data.visitor_uniform
    this.formation = data.formation
  }

  cancelar(){
    this.id = ""
    this.name = ""
    this.locale_uniform = ""
    this.visitor_uniform = ""
    this.formation = ""
  }

  listar(){
    this.service.listar().subscribe(data => {
      this.list = data as any[]
    })
  }

}
