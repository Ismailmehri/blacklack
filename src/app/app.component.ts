import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState, selectGame, selectShuffle} from "./commun/store/reducers";
import {Player} from "./commun/model/player.model";
import {
  AddOrUpdateDealerAction,
  AddOrUpdatePlayerAction,
  StopPlayingAction
} from "./commun/store/actions/player.actions";
import {Subject} from "rxjs";
import {take, takeUntil} from "rxjs/operators";
import {ShuffleInterface} from "./commun/interface/shuffle.interface";
import {GameService} from "./commun/service/game.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  public isPlayerStoppedPlaying = false;
  public isGameStated = false;

  private shuffle: ShuffleInterface | null = null;
  private player!: Player;
  private subscription$ = new Subject()

  constructor(private store: Store<AppState>,
              private gameService: GameService) {
  }

  ngOnInit(): void {
    this.store
      .select(selectShuffle)
      .pipe(takeUntil(this.subscription$))
      .subscribe((shuffle) => {
        this.shuffle = shuffle;
        this.isGameStated = this.shuffle !== null;
        this.store.dispatch(new AddOrUpdateDealerAction(new Player('Banque')));
        this.store.dispatch(new AddOrUpdatePlayerAction(new Player('Player')));
      });

    this.store
      .select(selectGame)
      .pipe(takeUntil(this.subscription$))
      .subscribe((game) => {
        if (game) {
          this.player = Object.assign({}, game.player);
          this.isPlayerStoppedPlaying = game.isPlayerStoppedPlaying;
        }
      });

  }

  getNewCard() {
    this.gameService.getCards(this.shuffle.deck_id, 1)
      .pipe(takeUntil(this.subscription$))
      .subscribe(newCard => {
        this.player.cards = this.player.cards.concat(newCard.cards);
        this.store.dispatch(new AddOrUpdatePlayerAction(this.player));
      });
  }

  stopPlaying() {
    this.store.dispatch(new StopPlayingAction(true));
  }

  ngOnDestroy(): void {
    this.subscription$.next();
    this.subscription$.complete();
  }

}
