import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MatchService } from 'src/app/services/match.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  teams: any[] = []
  teamsDisp: string[] = []

  visitor: any
  locale: any
  date: Date = new Date()
  list: Array<any> | undefined = []
  id: string = ""
  search: string = ""

  dropdownSettings:IDropdownSettings = {
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  constructor(private service: MatchService, private router: Router, private TS: TeamService) {
    this.listar()
    this.TS.listar().subscribe(data => {
      this.teams = data as any[]
      this.teamsDisp = (data as any[]).map(it => it.name)
    })
  }

  ngOnInit(): void {
  }

  async crear(){
    const visitor = this.teams.filter(it => it.name === this.visitor[0])[0]._id
    const locale = this.teams.filter(it => it.name === this.locale[0])[0]._id
    const data = {
      visitor, 
      locale,
      date: this.date
    }
    await this.service.create(data)
    this.cancelar()
  }

  async actualizar(){
    const visitor = this.teams.filter(it => it.name === this.visitor[0])[0]._id
    const locale = this.teams.filter(it => it.name === this.locale[0])[0]._id
    const data = {
      _id: this.id,
      visitor, 
      locale,
      date: this.date
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

  see(i: number){
    const id = this.list?.[i]._id
    this.router.navigate(["/match", id])
  }

  editar(i: number){
    const data = {...this.list?.[i]}
    this.id = data._id
    this.visitor = [data.visitor]
    this.locale = [data.locale]
    const date = data.date.split("T")[0]
    this.date = new Date(date)
  }

  cancelar(){
    this.id = ""
    this.visitor = ""
    this.locale = ""
    this.date = new Date()
  }

  listar(){
    this.service.listar().subscribe(data => {
      this.list = data as any[]
    })
  }
}
