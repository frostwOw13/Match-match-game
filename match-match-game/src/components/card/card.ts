import './card.scss';
import { BaseComponent } from '../base-component';
import { CardSelf } from './card-self/card-self';
import { FLIP_CLASS } from '../../shared/constants';

export class Card extends BaseComponent {
<<<<<<< HEAD
  isFlipped: boolean = false;
=======
  isFlipped: boolean = false;
>>>>>>> f0a46c0acb25b78089d33df3a4fd96dc4013a90e

  readonly cardSelf: CardSelf;

  constructor(readonly image: string) {
    super('div', ['field-container__card']);
    this.cardSelf = new CardSelf(image);

    this.element.appendChild(this.cardSelf.element);
  }

  public flipToBack(): Promise<void> {
    this.isFlipped = true;
    return this.flip(true);
  }

  public flipToFront(): Promise<void> {
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
