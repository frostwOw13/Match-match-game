import { BaseComponent } from '../base-component';
import { Player } from './player/player';
import { Database } from '../../database';
import { MyObject } from '../../shared/constants';
import './best-score.scss';

export class BestScore extends BaseComponent {
  private players: Player[] = [];

  private db: Database;

  private playersData: { [key: string]: unknown }[] = [];

  constructor() {
    super('div', ['best-score']);

    this.element.innerHTML = `
      <h2 class="best-score__title">Best players</h2>
    `;

    this.db = new Database();
  }

  public initRecords(): void {
    this.db.init('frostwOw13');
    setTimeout(async () => {
      this.playersData = await this.db.readAll('frostwOw13');

      setTimeout(() => {
        this.playersData.forEach((playerDataObject) => {
          const {
            score,
            firstName,
            secondName,
            email,
          }: MyObject = playerDataObject;

          if (this.players.length !== 0) {
            this.checkUniq();
            this.players.push(new Player(`${firstName} ${secondName}`, email, score));
          } else {
            this.players.push(new Player(`${firstName} ${secondName}`, email, score));
          }
        });

        this.players.sort((a, b) => {
          if (a.score > b.score) {
            return -1;
          }
          if (a.score < b.score) {
            return 1;
          }
          return 0;
        });

        if (this.element.children.length <= 10) {
          this.players.forEach((player) => {
            this.element.appendChild(player.element);
          });
        }
      }, 100);
    }, 100);
  }

  private checkUniq(): void {
    this.players = this.players.filter(
      (el, i, array) => !array
        .slice(0, i)
        .find(({ score, fullName, email }) => score === el.score && fullName === el.fullName && email === el.email),
    );
  }
}
