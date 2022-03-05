import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';
import { ActivatedRoute } from '@angular/router'
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TYPES } from 'src/app/constants';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss']
})
export class MatchDetailComponent implements OnInit {

  info: any
  players: any[] = []
  teams: any[] = []
  playersDisp: string[] = []
  teamsDisp: string[] = []
  types: any[] = TYPES
  cards: string[] = ["Amarilla", "Roja"]

  selectedPlayer: any
  selectedTeam: any
  v_a_r: boolean = false
  resv_a_r: string = ""
  observation: string = ""
  _id: string = ""
  card: any
  type: any

  dropdownSettings:IDropdownSettings = {
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  constructor(private service: MatchService, private router: ActivatedRoute, private PS: PlayerService, private TS: TeamService) {
    this.service.match().subscribe(data => {
      this.info = data as any
      this.teamsDisp = [this.info.locale, this.info.visitor]
    })
    this.PS.listar().subscribe(data => {
      this.players = data as any
    })
    this.TS.listar().subscribe(data => {
      this.teams = data as any[]
    })
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      const id = params['id']
      this._id = id
      this.service.getMatch(id)
    })
  }

  save(e: any){
    e.preventDefault()
    const player = this.players.filter(it => it.name === this.selectedPlayer[0])[0]._id
    const team = this.teams.filter(it => it.name === this.selectedTeam[0])[0]._id
    const obj = {
      _id: this._id, type: this.type, observation: this.observation, team: team || null, v_a_r: this.v_a_r, v_a_r_result: this.resv_a_r || null, player: player || null, card: this.card || null
    }
    this.service.addEvent(obj)
  }

  changePlayer(e: any){
    this.playersDisp = this.teams.filter(it => it.name === e)[0].players
  }

}
