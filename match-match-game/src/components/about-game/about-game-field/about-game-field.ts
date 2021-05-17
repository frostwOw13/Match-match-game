import { BaseComponent } from "../../base-component";
import './about-game-field.scss';

export class AboutGameField extends BaseComponent {
  constructor() {
    super('div', ['about-game__field'])

    this.element.innerHTML = `
    <div class="about-game__blocks">

      <div class="blocks__item">
        <div class="item__number">1</div>
        <p class="item__title">
          Register new player in game
        </p>
      </div>

      <div class="blocks__item">
        <div class="item__number">2</div>
        <p class="item__title">
          Configure your game settings
        </p>
      </div>

      <div class="blocks__item">
        <div class="item__number">3</div>
        <p class="item__title">
          Start you new game! Remember card
          positions and match it before times up.
        </p>
      </div>

    </div>

    <div class="about-game__images">
      <div class="images__img"></div>
      <div class="images__img"></div>
      <div class="images__img"></div>
    </div>
    `
  }
}
