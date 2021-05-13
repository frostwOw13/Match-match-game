import { BaseComponent } from "../../base-component";
import './header-logo.scss';

export class HeaderLogo extends BaseComponent {
  constructor() {
    super('div', ['header__logo-container']);

    this.element.innerHTML = `
      <h3 class="logo-container__logo">match</h3>
      <button class="logo-container__btn">match</button>
    `;
  }
}
