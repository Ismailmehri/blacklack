import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreComponent } from './score.component';
import {AppModule} from "../app.module";
import {DirectiveModule} from "../commun/directive/directive.module";



@NgModule({
    declarations: [
        ScoreComponent
    ],
    exports: [
        ScoreComponent
    ],
  imports: [
    CommonModule,
    DirectiveModule
  ]
})
export class ScoreModule { }
