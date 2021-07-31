import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UrlManager} from "../enum/urlManager.enum";
import {Observable} from "rxjs";
import {ShuffleInterface} from "../interface/shuffle.interface";
import {CardsInterface} from "../interface/cards.interface";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  public createNewShuffle(): Observable<ShuffleInterface> {
    return this.http.get<ShuffleInterface>(environment.api + UrlManager.NEW_SHUFFLE);
  }

  public getCards(id: string | undefined, count: number): Observable<CardsInterface> {
    return this.http.get<CardsInterface>(environment.api + UrlManager.DECK + id
      + UrlManager.DRAW + count)
  }
}
