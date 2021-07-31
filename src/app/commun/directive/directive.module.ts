import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlayerScoreDirective} from "./player-score.directive";



@NgModule({
  declarations: [PlayerScoreDirective],
  imports: [
    CommonModule
  ],
  exports: [
    PlayerScoreDirective
  ]
})
export class DirectiveModule { }
