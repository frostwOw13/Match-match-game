import { BaseComponent } from '../../base-component';
import './difficulty.scss';

export class Difficulty extends BaseComponent {
  constructor() {
    super('div', ['settings__dif']);

    this.element.innerHTML = `
      <p class="dif__title">Difficulty</p>
      <div class="settings-chooser">
        <select id="difficulty">
          <option value="1">4x3</option>
          <option value="2">4x4</option>
          <option value="3">4x5</option>
        </select>
      </div>
    `;
  }
}
