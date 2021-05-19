import { BaseComponent } from '../base-component';
import { Player } from './player/player';
import './best-score.scss';

export class BestScore extends BaseComponent {
  private readonly players: Player[] = [];

  constructor() {
    super('div', ['best-score']);

    this.element.innerHTML = `
      <h2 class="best-score__title">Best players</h2>
    `;
    this.players.push(
      new Player('Nicci Troiani', 'nicci@gmail.com', 456),
      new Player('George Fields', 'jack@gmail.com', 358),
      new Player('Jones Dermot', 'dermot@gamil.com', 211),
      new Player('Jane Doe', 'jane.doe@gmail.com', 169),
    );

    for (let i = 0; i < this.players.length; i++) {
      this.element.appendChild(this.players[i].element);
    }
  }
}
