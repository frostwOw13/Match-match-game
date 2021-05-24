import { BaseComponent } from '../base-component';
import './form.scss';

export class Form extends BaseComponent {
  constructor() {
    super('div', ['form']);

    this.element.innerHTML = `
      <h3 class='form__title'>Register new player</h3>

      <div class='form__container'>
        <form class='input-container'>
          <label for="firstName">first name</label>
          <input type="text" name="firstName" value="insert your first name">

          <label for="secondName">secondName</label>
          <input type="text" name="secondName" value="insert your seconds name">

          <label for="email">Email</label>
          <input type="text" name="email" value="insert your email">
        </form>

        <div class='image-container'></div>
      </div>

      <div class="form__buttons">
        <button id="add" class="btn">add user</button>
        <button id="cancel" class="btn">cancel</button>
      </div>
    `;
  }
}
