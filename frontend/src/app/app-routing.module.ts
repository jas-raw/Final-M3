import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchDetailComponent } from './components/match-detail/match-detail.component';
import { MatchComponent } from './components/match/match.component';
import { PlayerComponent } from './components/player/player.component';
import { TeamComponent } from './components/team/team.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: "match",
    component: MatchComponent
  },{
    path: "player",
    component: PlayerComponent
  },{
    path: "team",
    component: TeamComponent
  },{
    path: "user",
    component: UserComponent
  },{
    path: "match/:id",
    component: MatchDetailComponent
  },{
    path: "**",
    redirectTo: "match"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
