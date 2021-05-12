import { delay } from "../../shared/delay";
import { BaseComponent } from "../base-component";
import { Card } from "../card/card";
import { MainField } from "../main-field/main-field";

const FLIP_DELAY = 1000; //ms

export class Game extends BaseComponent {
  private readonly mainField: MainField;
  private activeCard?: Card;
  private isAnimation = false;

  constructor() {
    super();
    this.mainField = new MainField();
    this.element.appendChild(this.mainField.element);
  }

  newGame(images: string[]) {
    this.mainField.clear();

    const cards = images
      .concat(images)
      .map((url: string) => new Card(url))
      .sort(() => Math.random() - .5)

    cards.forEach((card) => {
      card.element.addEventListener('click', () => this.cardHandler(card));
    });

    this.mainField.addCards(cards);
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

    if (this.activeCard.image != card.image) { // If cards not match
      await delay(FLIP_DELAY);  // TODO: Make cards red
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
    } // TODO: make else statement and make cards green

    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
