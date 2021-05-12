import './card.scss'
import { BaseComponent } from "../base-component";

const FLIP_CLASS = 'flipped';

export class Card extends BaseComponent {
  isFlipped = false;

  constructor(readonly image: string) {
    super('div', ['field-container__card']);

    this.element.innerHTML = `
      <div class="card">
        <div class="card_front" style="background-image: url('./images/${image}')"></div>
        <div class="card_back"></div>
      </div>
    `
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
    })
  }
}
