import { BaseComponent } from '../../base-component';

export class Difficulty extends BaseComponent {
  constructor() {
    super('div', ['settings__item']);

    this.element.innerHTML = `
      <p class="item__title">Difficulty</p>
      <div class="settings-chooser">
        <select id="difficulty" class="settings-chooser__select">
          <option value="1">4x3</option>
          <option value="2">4x4</option>
          <option value="3">4x5</option>
        </select>
      </div>
    `;
  }
}
