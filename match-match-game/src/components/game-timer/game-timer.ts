import { BaseComponent } from '../base-component';
import './game-timer.scss';

export class GameTimer extends BaseComponent {
  seconds: number;

  minutes: number;

  interval!: ReturnType<typeof setInterval>

  constructor() {
    super('div', ['main__timer']);

    this.element.innerHTML = `
      <p class="timer__count">00:00</p>
    `;

    this.seconds = 0;
    this.minutes = 0;
  }

  timerStart() {
    this.interval = setInterval(() => {
      if (this.seconds > 59) {
        this.minutes++;
        this.seconds = 0;
      } else {
        this.seconds++;
      }

      this.element.innerHTML = `
        <p class="timer__count">${this.minutes < 10 ? `0${this.minutes}` : this.minutes}:
          ${this.seconds < 10 ? `0${this.seconds}` : this.seconds}</p>
      `;
    }, 1000);
  }

  timerStop() {
    clearInterval(this.interval);
    this.minutes = 0;
    this.seconds = 0;
  }
}
