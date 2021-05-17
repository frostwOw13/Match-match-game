import { BaseComponent } from "../base-component";
import { AboutGameField } from "./about-game-field/about-game-field";
import './about-game.scss';

export class AboutGame extends BaseComponent {
  private readonly aboutGameField: AboutGameField;

  constructor() {
    super('div', ['about-game']);
    this.aboutGameField = new AboutGameField();

    this.element.innerHTML = `
      <h3 class="about-game__title">
        How to play?
      </h3>
    `;

    this.element.appendChild(this.aboutGameField.element);
  }
}
