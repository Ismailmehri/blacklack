import {Directive, DoCheck, ElementRef, Input, OnInit} from '@angular/core';
import {getStatus} from "../../app.utils";

@Directive({
  selector: '[appPlayerScore]'
})
export class PlayerScoreDirective implements DoCheck {

  @Input() score: number;

  constructor(private el: ElementRef) { }

  ngDoCheck(): void {
    this.el.nativeElement.innerHTML = getStatus(this.score);
    if (this.score > 21) {
      this.el.nativeElement.style.color = 'red';
    } else {
      this.el.nativeElement.style.color = 'green';
    }
  }

}
