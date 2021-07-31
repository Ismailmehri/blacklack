import { Action } from '@ngrx/store';
import {Player} from "../../model/player.model";
import {ShuffleInterface} from "../../interface/shuffle.interface";

export enum PlayerActionTypes {
  addOrUpdatePlayer = '[Player] Add or update Player',
  stopPlayingCards = '[Player] player stopped playing',
  playerIsTheWinner = '[Player] is the winner',
  playerIsTheLoser = '[Player] is the loser',

  addOrUpdateDealer = '[Dealer] Add or update Dealer',
  getCardForDealer = '[Dealer] Get new Card',
  dealerIsTheWinner = '[Dealer] is the winner',
  dealerIsTheLoser = '[Dealer] is the loser',

  getShuffle = '[Game] Get shuffle',
  getShuffleSuccess = '[Game] Get shuffle success',
  getShuffleErrors = '[Game] Get shuffle errors',
  isTheGameEnded = '[Game] Is the Game Ended'
}

export class AddOrUpdatePlayerAction implements Action {
  readonly type = PlayerActionTypes.addOrUpdatePlayer;
  constructor(public payload: Player) { }
}

export class AddOrUpdateDealerAction implements Action {
  readonly type = PlayerActionTypes.addOrUpdateDealer;
  constructor(public payload: Player) { }
}

export class StopPlayingAction implements Action {
  readonly type = PlayerActionTypes.stopPlayingCards;
  constructor(public payload: boolean) { }
}

export class GetShuffleAction implements Action {
  readonly type = PlayerActionTypes.getShuffle;
}

export class GetShuffleActionSuccess implements Action {
  readonly type = PlayerActionTypes.getShuffleSuccess;
  constructor(public payload: ShuffleInterface) {
  }
}

export class GetShuffleActionError implements Action {
  readonly type = PlayerActionTypes.getShuffleErrors;
}

export class GetNewCardForDealerAction implements Action {
  readonly type = PlayerActionTypes.getCardForDealer;
}

export class PlayerIsTheWinnerAction implements Action {
  readonly type = PlayerActionTypes.playerIsTheWinner;
}

export class PlayerIsTheLoserAction implements Action {
  readonly type = PlayerActionTypes.playerIsTheLoser;
}

export class DealerIsTheWinnerAction implements Action {
  readonly type = PlayerActionTypes.dealerIsTheWinner;
}

export class DealerIsTheLoserAction implements Action {
  readonly type = PlayerActionTypes.dealerIsTheLoser;
}

export class IsTheGameEnded implements Action {
  readonly type = PlayerActionTypes.isTheGameEnded;
  constructor(public payload: boolean) {
  }
}


export type PlayerActions = AddOrUpdatePlayerAction | AddOrUpdateDealerAction | StopPlayingAction
  |GetShuffleAction | GetShuffleActionSuccess | GetShuffleActionError | PlayerIsTheLoserAction | IsTheGameEnded
  | PlayerIsTheWinnerAction | DealerIsTheLoserAction | DealerIsTheWinnerAction | GetNewCardForDealerAction;

