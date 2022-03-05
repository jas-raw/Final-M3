import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { POSITIONS } from 'src/app/constants';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  name: string = ""
  position: any
  shirt: number = 0
  list: Array<any> | undefined = []
  id: string = ""
  search: string = ""

  positions = POSITIONS

  dropdownSettings:IDropdownSettings = {
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  constructor(private service: PlayerService) {
    this.listar()
  }

  ngOnInit(): void {
  }

  async crear(){
    const data = {
      name: this.name, 
      shirt: this.shirt,
      position: this.position[0]
    }
    await this.service.create(data)
    this.cancelar()
  }

  async actualizar(){
    const data = {
      _id: this.id,
      name: this.name, 
      shirt: this.shirt,
      position: this.position[0]
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
    this.shirt = data.shirt
    this.position = data.position
  }

  cancelar(){
    this.id = ""
    this.name = ""
    this.shirt = 0
    this.position = ""
  }

  listar(){
    this.service.listar().subscribe(data => {
      this.list = data as any[]
    })
  }

}
