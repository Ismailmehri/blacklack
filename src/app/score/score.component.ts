import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState, selectDealer, selectGame, selectPlayer} from "../commun/store/reducers";
import {takeUntil} from "rxjs/operators";
import {Player} from "../commun/model/player.model";
import {ShuffleInterface} from "../commun/interface/shuffle.interface";
import {Subject} from "rxjs";
import {getScoreValue} from "../app.utils";
import {
  DealerIsTheLoserAction,
  DealerIsTheWinnerAction, GetNewCardForDealerAction,
  GetShuffleAction, IsTheGameEnded,
  PlayerIsTheLoserAction, PlayerIsTheWinnerAction, StopPlayingAction
} from "../commun/store/actions/player.actions";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit, OnDestroy {

  public playerScore = 0;
  public dealerScore = 0;

  private dealer!: Player;
  private player!: Player;
  private isPlayerStoppedPlaying = false;
  private isGameEnded = false;
  private subscription$ = new Subject();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.store
      .select(selectGame)
      .pipe(takeUntil(this.subscription$))
      .subscribe((game) => {
        if (game) {
          this.player = Object.assign({}, game.player);
          this.playerScore = getScoreValue(this.player);
          this.dealer = Object.assign({}, game.dealer);
          this.dealerScore = getScoreValue(this.dealer);
          this.isPlayerStoppedPlaying = game.isPlayerStoppedPlaying;
          this.isGameEnded = game.isTheGameEnded;
          this.isGameOver();
        }
      });

  }

  public newGame() {
    this.store.dispatch(new GetShuffleAction());
    this.store.dispatch(new StopPlayingAction(false));
    this.store.dispatch(new IsTheGameEnded(false));
  }

  public isGameOver() {
    if (this.isGameEnded) {
      return;
    }

    if (this.playerScore > 21) {
      this.store.dispatch(new PlayerIsTheLoserAction());
      this.store.dispatch(new DealerIsTheWinnerAction());
      this.store.dispatch(new IsTheGameEnded(true));
    } else if (this.dealerScore > 21 ||
      (this.isPlayerStoppedPlaying && this.playerScore < this.dealerScore)) {
      this.store.dispatch(new PlayerIsTheWinnerAction());
      this.store.dispatch(new DealerIsTheLoserAction());
      this.store.dispatch(new IsTheGameEnded(true));
    } else if (this.isPlayerStoppedPlaying) {
        this.store.dispatch(new GetNewCardForDealerAction());
    }
  }

  ngOnDestroy(): void {
    this.subscription$.next();
    this.subscription$.complete();
  }
}
