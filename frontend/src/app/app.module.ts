import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatchComponent } from './components/match/match.component';
import { UserComponent } from './components/user/user.component';
import { PlayerComponent } from './components/player/player.component';
import { TeamComponent } from './components/team/team.component';
import { NavComponent } from './components/nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayerService } from './services/player.service';
import { MatchService } from './services/match.service';
import { TeamService } from './services/team.service';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { MatchDetailComponent } from './components/match-detail/match-detail.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    MatchComponent,
    UserComponent,
    PlayerComponent,
    TeamComponent,
    NavComponent,
    MatchDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    PlayerService,
    MatchService,
    TeamService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
