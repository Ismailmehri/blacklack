import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  AppState,
  selectDealer,
  selectGame,
  selectIsGameEnded,
  selectPlayer,
  selectShuffle
} from "../commun/store/reducers";
import {Store} from "@ngrx/store";
import {Subject} from "rxjs";
import {take, takeUntil} from "rxjs/operators";
import {Player} from "../commun/model/player.model";
import {GameService} from "../commun/service/game.service";
import {ShuffleInterface} from "../commun/interface/shuffle.interface";
import {AddOrUpdatePlayerAction, PlayerActionTypes} from "../commun/store/actions/player.actions";
import {Actions, ofType} from "@ngrx/effects";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {

  public player!: Player;
  public shuffle!: ShuffleInterface | null;
  public isTheWinner = false;
  public isTheGameEnded = false;

  private subscription$ = new Subject()

  constructor(private store: Store<AppState>,
              private gameService: GameService,
              private actions$: Actions) { }

  ngOnInit(): void {

    this.store
      .select(selectPlayer)
      .pipe(takeUntil(this.subscription$))
      .subscribe((player) => {
        if (player) {
          this.player = Object.assign({}, player);
        }
      });

    this.store
      .select(selectShuffle)
      .pipe(takeUntil(this.subscription$))
      .subscribe((shuffle) => {
        this.shuffle = shuffle;
        if (this.shuffle) {
          this.getCardsForThisPlayer();
        }
      });

    this.store
      .select(selectIsGameEnded)
      .pipe(takeUntil(this.subscription$))
      .subscribe((isTheGameEnded) => {
        this.isTheGameEnded = isTheGameEnded;
      });

    this.actions$.pipe(
        ofType(PlayerActionTypes.playerIsTheWinner),
        takeUntil(this.subscription$))
      .subscribe(()=> this.isTheWinner = true);

    this.actions$.pipe(
      ofType(PlayerActionTypes.playerIsTheLoser),
      takeUntil(this.subscription$))
      .subscribe(()=> this.isTheWinner = false);
  }

  private getCardsForThisPlayer() {
    this.gameService.getCards(this.shuffle?.deck_id, 2)
      .pipe(takeUntil(this.subscription$))
      .subscribe((response) => {
        if (this.player) {
            this.player.cards = response.cards;
            this.store.dispatch(new AddOrUpdatePlayerAction(this.player));
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription$.next();
    this.subscription$.complete();
  }

}
