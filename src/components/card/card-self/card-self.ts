import { BaseComponent } from '../../base-component';
import './card-self.scss';

export class CardSelf extends BaseComponent {
  constructor(readonly image: string) {
    super('div', ['card']);

    this.element.innerHTML = `
      <div class="card_front" style="background-image: url('./images/${image}')"></div>
      <div class="card_back"></div>
    `;
  }
}
