import { BaseComponent } from '../../base-component';

export class CardsType extends BaseComponent {
  constructor() {
    super('div', ['settings__item']);

    this.element.innerHTML = `
      <p class="item__title">Game cards</p>
      <div class="settings-chooser">
        <select id="cards-type">
          <option value="Animals">Animals</option>
          <option value="Cars">Cars</option>
        </select>
      </div>
    `;
  }
}
