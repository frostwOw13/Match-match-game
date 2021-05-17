import { BaseComponent } from "../../base-component";
import './difficulty.scss';

export class Difficulty extends BaseComponent {
  constructor() {
    super('div', ['settings__dif']);

    this.element.innerHTML = `
      <p class="dif__title">Difficulty</p>
      <div class="select">
        <select>
          <option value="">select game type</option>
          <option value="4x4">4x4</option>
          <option value="5x5">5x5</option>
          <option value="6x6">6x6</option>
        </select>
      </div>
    `;
  }
}
