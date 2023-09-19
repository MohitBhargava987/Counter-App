import { Component } from '@angular/core';
import { MainService } from './main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Frontend';
  ngOnInit() {
    this.getCounterVal();
  }
  constructor(private service: MainService) {

  }
  counterValue: number = 0;

  incrementCounter() {
    this.counterValue++;
    this.updateCounter();
  }

  decrementCounter() {
    if (this.counterValue > 0) {
      this.counterValue--;
      this.updateCounter();
    }
  }

  removeCounter() {
    this.counterValue = 0;
    this.updateCounter();
  }

  getCounterVal() {
    console.log('asdasdas');

    this.service.api({}, `counter/get_counter`, 200, 'get')
      .subscribe((res: any) => {
        if (res) {
          this.counterValue = res.counterValue;
        }
      })
  }

  updateCounter() {
    this.service.api({ counter_val: this.counterValue }, `counter/update_counter`, 200, 'post')
      .subscribe((res: any) => {
        if (res) {
          console.log(res, 'res');
        }
      })
  }
}
