import { Game } from '../../game';
import { delay } from '../../shared/delay';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { PopUp } from '../pop-up/pop-up';
import './main-field.scss';

const FLIP_DELAY = 1000; // ms, delay between flipping cards
const SHOW_TIME = 1000; // ms, time that show cards before the game starts

export class MainField extends BaseComponent {

  cards: Card[] = [];

  constructor() {
    super('div', ['main__field']);
  }

  clear() {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]) {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
    }, SHOW_TIME);
  }

  removeAddClass(activeCard: HTMLElement, card: HTMLElement, type: string) {
    activeCard.classList.add('red');
    card.classList.add('red');

    setInterval(() => {
      activeCard.classList.remove(type);
      card.classList.remove(type);
    }, 1000)
  }
}
