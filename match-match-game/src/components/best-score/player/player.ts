import { BaseComponent } from '../../base-component';
import './player.scss';

export class Player extends BaseComponent {
  public fullName: string;

  public email: string;

  public score: number;

  constructor(fullName: string, email: string, score: number) {
    super('div', ['best-score__player']);

    this.fullName = fullName;
    this.email = email;
    this.score = score;

    this.element.innerHTML = `
      <div class="player__picture"></div>
      <div class="player__item">
        <p class="item__name">${this.fullName}</p>
        <p class="item__email">${this.email}</p>
      </div>
      <p class="player__score">Score: <span>${this.score}</span></p>
    `;
  }
}
