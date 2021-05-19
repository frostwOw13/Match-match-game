import { BaseComponent } from '../../base-component';
import './header-reg.scss';

export class HeaderReg extends BaseComponent {
  constructor() {
    super('button', ['header__btn']);

    this.element.innerHTML = 'register new player';
  }
}
