import { BaseComponent } from '../base-component';
import './form.scss';

export class Form extends BaseComponent {
  constructor() {
    super('div', ['form']);

    this.element.innerHTML = `
      <div class="form__container">
        <div class="form__header">
          <h3>Register new player</h3>
        </div>

        <div class="form-wrapper">
          <form id="form" class="form">

            <div class="form-control">
              <label for="firstName">First name</label>
              <input type="text" placeholder="Jones" id="firstName" />
              <i class="fas fa-check-circle"></i>
              <i class="fas fa-exclamation-circle"></i>
              <small>Error message</small>
            </div>

            <div class="form-control">
              <label for="secondName">Second name</label>
              <input type="text" placeholder="Dermot" id="secondName" />
              <i class="fas fa-check-circle"></i>
              <i class="fas fa-exclamation-circle"></i>
              <small>Error message</small>
            </div>

            <div class="form-control">
              <label for="email">Email</label>
              <input type="email" placeholder="example@gmail.com" id="email"/>
              <i class="fas fa-check-circle"></i>
              <i class="fas fa-exclamation-circle"></i>
              <small>Error message</small>
            </div>

            <button id="cancel" class="btn">cancel</button>
            <button id="add" class="btn">add user</button>
            
          </form>

          <div class="form__picture">
            <div alt="load your picture" class="picture__img"></div>
          </div>

        </div>

      </div>
    `;
  }
}
