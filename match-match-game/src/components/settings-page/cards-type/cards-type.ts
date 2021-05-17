import { BaseComponent } from "../../base-component";
import './cards-type.scss';

export class CardsType extends BaseComponent {
  constructor() {
    super('div', ['settings__cards-type'])

    this.element.innerHTML = `
      <p class="cards-type__title">Game cards</p>
      <div class="select">
        <select>
          <option value="">select game cards type</option>
          <option value="Animals">Animals</option>
          <option value="Cars">Cars</option>
        </select>
      </div>
    `;
  }
}
