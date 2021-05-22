import './card.scss';
import { BaseComponent } from '../base-component';
import { CardSelf } from './card-self/card-self';

const FLIP_CLASS = 'flipped';

export class Card extends BaseComponent {
  isFlipped = false;

  readonly cardSelf: CardSelf;

  constructor(readonly image: string) {
    super('div', ['field-container__card']);
    this.cardSelf = new CardSelf(image);

    this.element.appendChild(this.cardSelf.element);
  }

  flipToBack() {
    this.isFlipped = true;
    return this.flip(true);
  }

  flipToFront() {
    this.isFlipped = false;
    return this.flip();
  }

  private flip(isFront = false): Promise<void> {
    return new Promise((resolve) => {
      this.element.classList.toggle(FLIP_CLASS, isFront);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }
}
