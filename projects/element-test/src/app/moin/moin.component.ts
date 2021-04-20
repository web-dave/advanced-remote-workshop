import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-moin',
  templateUrl: './moin.component.html',
  styleUrls: ['./moin.component.scss']
})
export class MoinComponent implements OnChanges {
  @Input() name!: string;
  @Output() highFive = new EventEmitter<string>();
  constructor() {}

  ngOnChanges(): void {
    console.log(this.name);
  }

  hi() {
    this.highFive.emit(`Moin, I'm ${this.name}!`);
  }
}
