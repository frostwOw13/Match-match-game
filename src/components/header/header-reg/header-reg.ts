import { BaseComponent } from '../../base-component';
import './header-reg.scss';

export class HeaderReg extends BaseComponent {
  constructor() {
    super('div', ['header__reg-container']);

    this.element.innerHTML = `
      <a href="#/game/" class="reg__link">
        <button class="header__btn">start game</button>
      </a>
    `;
  }
}
