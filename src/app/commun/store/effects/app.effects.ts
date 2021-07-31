import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {GetShuffleActionError, GetShuffleActionSuccess, PlayerActionTypes} from "../actions/player.actions";
import {GameService} from "../../service/game.service";
import {catchError, map, mergeMap} from "rxjs/operators";
import {of, pipe} from "rxjs";



@Injectable()
export class AppEffects {

  constructor(private actions$: Actions, private gameService: GameService) {}

  @Effect()
  getShuffle = this.actions$
    .pipe(ofType(PlayerActionTypes.getShuffle),
      mergeMap(() => this.gameService.createNewShuffle()),
      pipe(
        map(newShuffle => {
        return new GetShuffleActionSuccess(newShuffle)
      }),
        catchError(() => of(new GetShuffleActionError()))
      )
    )
}
