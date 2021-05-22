import { App } from '../../app';
import { delay } from '../../shared/delay';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { PopUp } from '../pop-up/pop-up';
import './main-field.scss';

const FLIP_DELAY = 1000; // ms, delay between flipping cards
const SHOW_TIME = 1000; // ms, time that show cards before the game starts

export class MainField extends BaseComponent {
  private activeCard?: Card;

  private isAnimation = false;

  private cards: Card[] = [];

  private readonly popUp: PopUp;

  constructor() {
    super('div', ['main__field']);

    this.popUp = new PopUp();
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

  removeAddClass(activeCard: HTMLElement, card: HTMLElement, type: string) {
    activeCard.classList.add('red');
    card.classList.add('red');

    setInterval(() => {
      activeCard.classList.remove(type);
      card.classList.remove(type);
    }, 1000)
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
      this.removeAddClass(this.activeCard.cardSelf.element, card.cardSelf.element, 'red');
      // await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
    } else {
      this.activeCard.cardSelf.element.classList.add('green');
      card.cardSelf.element.classList.add('green');

      let countClasses = 0;

      this.cards.forEach((card) => {
        if (card.cardSelf.element.classList.contains('green')) {
          countClasses++;
          if (countClasses === this.cards.length) {
            this.activeCard = undefined;
            this.isAnimation = false;

            let minutes = Number(document.querySelector('.timer__count')?.innerHTML.split(':')[0]);
            let seconds = Number(document.querySelector('.timer__count')?.innerHTML.split(':')[1]);

            this.element.appendChild(this.popUp.element);
            this.popUp.element.classList.add('active')
            this.popUp.winner(minutes, seconds);



          }
        }
      });
      countClasses = 0;
    }

    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
