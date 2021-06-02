import { BaseComponent } from '../base-component';
import { Form } from '../form/form';
import './pop-up.scss';

export class PopUp extends BaseComponent {
  /**
   * If player press add user to score page
   */
  public isReg: boolean;

  private readonly form: Form;

  constructor() {
    super('div', ['pop-up']);

    this.isReg = false;
    this.form = new Form();
  }

  public winner(minutes: number, seconds: number, score: number): void {
    this.element.innerHTML = `
      <div class="pop-up__body">
        <div class="pop-up__content">
          <div class="pop-up__text">
          Congratulations! You successfully found all matches on ${(minutes * 60) + seconds} seconds.
          You have scored ${score} points. Would you like to save your results?
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
        const timerCount = document.querySelector('.timer__count');
        if (timerCount) timerCount.innerHTML = '00:00';
      } else if (target.id === 'yes') {
        this.isReg = true;
        this.element.classList.add('hidden');
        this.element.before(this.form.element);
        this.form.validate(score);
      }
    });
  }
}
