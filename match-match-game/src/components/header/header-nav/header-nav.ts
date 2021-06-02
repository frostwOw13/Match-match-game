import { BaseComponent } from '../../base-component';
import './header-nav.scss';

export class HeaderNav extends BaseComponent {
  constructor() {
    super('div', ['header__nav']);

    this.element.innerHTML = `
        <div class="nav__item">
          <a href="#/" class="nav__link">
            <i class="fas fa-question-circle fa-lg"></i>
            <p class="nav__title">About game</p>
          </a>
        </div>

        <div class="nav__item">
          <a href="#/best-score/" class="nav__link">
            <i class="fas fa-star fa-lg"></i>
            <p class="nav__title">Best score</p>
          </a>
        </div>

        <div class="nav__item">
          <a href="#/settings/" class="nav__link">
            <i class="fas fa-cog fa-lg"></i>
            <p class="nav__title">Game setting</p>
          </a>
        </div>
    `;
  }
}
