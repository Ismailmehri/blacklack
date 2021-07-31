import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState, selectDealer, selectIsGameEnded, selectShuffle} from "../commun/store/reducers";
import {Player} from "../commun/model/player.model";
import {take, takeUntil} from "rxjs/operators";
import {
  AddOrUpdateDealerAction,
  AddOrUpdatePlayerAction,
  PlayerActionTypes
} from "../commun/store/actions/player.actions";
import {ShuffleInterface} from "../commun/interface/shuffle.interface";
import {GameService} from "../commun/service/game.service";
import {Actions, ofType} from "@ngrx/effects";

@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.css']
})
export class DealerComponent implements OnInit, OnDestroy {

  public dealer!: Player;
  public shuffle!: ShuffleInterface | null;
  public isTheWinner =  false
  public isTheGameEnded =  false;

  private subscription$ = new Subject();

  constructor(private store: Store<AppState>,
              private gameService: GameService,
              private actions$: Actions) { }

  ngOnInit(): void {

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
      .select(selectDealer)
      .pipe(takeUntil(this.subscription$))
      .subscribe((dealer) => {
        if (dealer) {
          this.dealer = Object.assign({}, dealer);
        }
      });

    this.store
      .select(selectIsGameEnded)
      .pipe(takeUntil(this.subscription$))
      .subscribe((isTheGameEnded) => {
        this.isTheGameEnded = isTheGameEnded;
      });

    this.actions$.pipe(
      ofType(PlayerActionTypes.getCardForDealer),
      takeUntil(this.subscription$)
    ).subscribe((value: any) => {
      this.gameService.getCards(this.shuffle.deck_id, 1)
        .pipe(take(1))
        .subscribe(newCard => {
          this.dealer.cards = this.dealer.cards.concat(newCard.cards);
          this.store.dispatch(new AddOrUpdateDealerAction(this.dealer));
        });
    });

    this.actions$.pipe(
      ofType(PlayerActionTypes.dealerIsTheWinner),
      takeUntil(this.subscription$))
      .subscribe(()=> this.isTheWinner = true);

    this.actions$.pipe(
      ofType(PlayerActionTypes.dealerIsTheLoser),
      takeUntil(this.subscription$))
      .subscribe(()=> this.isTheWinner = false);
  }

  private getCardsForThisPlayer() {
    this.gameService.getCards(this.shuffle?.deck_id, 1)
      .pipe(takeUntil(this.subscription$))
      .subscribe((response) => {
        if (this.dealer) {
          this.dealer.cards = response.cards;
          this.store.dispatch(new AddOrUpdateDealerAction(this.dealer));
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription$.next();
    this.subscription$.complete();
  }

}
