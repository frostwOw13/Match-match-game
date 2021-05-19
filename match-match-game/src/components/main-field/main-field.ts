import { delay } from '../../shared/delay';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import './main-field.scss';

const FLIP_DELAY = 1000; // ms, delay between flipping cards
const SHOW_TIME = 5000; // ms, time that show cards before the game starts

export class MainField extends BaseComponent {
  private activeCard?: Card;

  private isAnimation = false;

  private cards: Card[] = [];

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

  newGame(images: string[]) {
    this.clear();

    const cards = images
      .concat(images)
      .map((url: string) => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
      card.element.addEventListener('click', () => this.cardHandler(card));
    });

    this.addCards(cards);
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;

    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card; // If you have not active card, add new active
      this.isAnimation = false;
      return;
    }

    if (this.activeCard.image !== card.image) { // If cards not match
      await delay(FLIP_DELAY);// TODO: Make cards red
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
    } // TODO: make else statement and make cards green

    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
