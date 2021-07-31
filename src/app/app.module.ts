import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Store, StoreModule} from '@ngrx/store';
import { reducers, metaReducers } from './commun/store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './commun/store/effects/app.effects';
import {GameService} from "./commun/service/game.service";
import {HttpClientModule} from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DealerModule} from "./dealer/dealer.module";
import {PlayerModule} from "./player/player.module";
import {ScoreModule} from "./score/score.module";
import { PlayerScoreDirective } from './commun/directive/player-score.directive';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    NgbModule,
    DealerModule,
    PlayerModule,
    ScoreModule
  ],
  providers: [GameService],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
