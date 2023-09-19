import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {
  @Input() counterValue: number = 0;
  @Output() incrementEvent = new EventEmitter<void>();
  @Output() decrementEvent = new EventEmitter<void>();
  @Output() removeCounterEvent = new EventEmitter<void>();

  increment() {
    this.incrementEvent.emit();
  }

  decrement() {
    this.decrementEvent.emit();
  }

  removeCounter() {
    this.removeCounterEvent.emit();
  }

  
}
