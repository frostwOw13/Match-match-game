import { BaseComponent } from '../base-component';
import { CardsType } from './cards-type/cards-type';
import { Difficulty } from './difficulty/difficulty';
import './settings.scss';

export class Settings extends BaseComponent {
  private readonly cardsType: CardsType;

  private readonly difficulty: Difficulty;

  constructor() {
    super('div', ['settings']);

    this.cardsType = new CardsType();
    this.difficulty = new Difficulty();

    this.element.appendChild(this.cardsType.element);
    this.element.appendChild(this.difficulty.element);
  }
}
