import { BaseComponent } from "../base-component";
import './pop-up.scss';

export class PopUp extends BaseComponent {
  constructor() {
    super('div', ['pop-up'])

  }

  winner(minutes: number, seconds: number) {
    this.element.innerHTML = `
      <div class="pop-up__body">
        <div class="pop-up__content">
          <div class="pop-up__text">
          Congratulations! You successfully found all matches on ${minutes ? `${minutes}.${seconds} minutes` : `${seconds} seconds`}.
          Would you like to save your results?
          </div>
          <div class="buttons">
            <button id="yes" class="btn">Yes</button>
            <button id="no" class="btn">No</button>
          </div>
        </div>
      </div>
    `;

    document.body.addEventListener('click', (event) => {
      const target = event.target as Element;
      if (target.id === 'no') {
        window.location.hash = '#/';
        document.querySelector('.main__timer')?.remove();
        document.querySelector('.main__field')?.remove();
      }
    })
  }
}
