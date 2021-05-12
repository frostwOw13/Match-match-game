import './main-field.scss';
import { BaseComponent } from "../base-component";
import { Card } from '../card/card';

const SHOW_TIME = 5;

export class MainField extends BaseComponent {
  private cards: Card[] = [];

  constructor() {
    super('div', ['main__field'])
  }

  clear() {
    this.cards = [];
    this.element.innerHTML = ``;
  }

  addCards(cards: Card[]) {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
    }, SHOW_TIME * 1000);
  }
}

