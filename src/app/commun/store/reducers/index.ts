import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../../../environments/environment';
import {Player} from "../../model/player.model";
import {PlayerActions, PlayerActionTypes} from "../actions/player.actions";
import {ShuffleInterface} from "../../interface/shuffle.interface";

export interface GameState {
  player: Player;
  dealer: Player;
  shuffle: ShuffleInterface | null;
  score: number;
  isPlayerStoppedPlaying: boolean;
  isTheGameEnded : boolean;
}

const initPlayerState: GameState = {
  player: new Player("Player"),
  dealer: new Player("Dealer"),
  shuffle: null,
  score: 0,
  isPlayerStoppedPlaying: false,
  isTheGameEnded : false
}

export interface AppState {
  game: GameState;
}

export function gameReducer(state: GameState = initPlayerState, action: PlayerActions): GameState {
  switch (action.type) {
    case PlayerActionTypes.addOrUpdatePlayer:
      return {...state, player: action.payload}

    case PlayerActionTypes.addOrUpdateDealer:
      return {...state, dealer: action.payload}

    case PlayerActionTypes.stopPlayingCards:
      return {...state, isPlayerStoppedPlaying: action.payload}

    case PlayerActionTypes.getShuffleSuccess:
      return {...state, shuffle: action.payload}

    case PlayerActionTypes.isTheGameEnded:
      return {...state, isTheGameEnded: action.payload}

    default:
      return state;
  }
}


export const reducers: ActionReducerMap<AppState, PlayerActions> = {
  game: gameReducer
};

export const selectPlayer = (state: AppState) => state.game.player;
export const selectDealer = (state: AppState) => state.game.dealer;
export const selectShuffle = (state: AppState) => state.game.shuffle;
export const selectIsGameEnded = (state :AppState) => state.game.isTheGameEnded;
export const selectGame = (state: AppState) => state.game;
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
