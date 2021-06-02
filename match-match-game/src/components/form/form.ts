import { Database } from '../../database';
import { BaseComponent } from '../base-component';
import { BestScore } from '../best-score/best-score';
import './form.scss';

export class Form extends BaseComponent {
  /**
   * If all field in form is valid
   */
  public isValidationSuccess = false;

  /**
   * Array for store the data from inputs
   */
  public playerData: Array<unknown> = [];

  private db: Database;

  private bestScore: BestScore;

  constructor() {
    super('div', ['form']);

    this.element.innerHTML = `
      <div class="form__container">
        <div class="form__body">
          <div class="form__header">
            <h3 class="header__title">Register new player</h3>
          </div>

          <div class="form-wrapper">
            <form id="form" class="form">

              <div class="form-control">
                <label for="firstName">First name</label>
                <input type="text" placeholder="Jones" id="firstName" maxlength="30"/>
                <div class="checkbox">
                  <span class="checkbox__first-part"></span>
                  <span class="checkbox__second-part"></span>
                </div>
                <small>Error message</small>
              </div>

              <div class="form-control">
                <label for="secondName">Second name</label>
                <input type="text" placeholder="Dermot" id="secondName" maxlength="30"/>
                <div class="checkbox">
                  <span class="checkbox__first-part"></span>
                  <span class="checkbox__second-part"></span>
                </div>
                <small>Error message</small>
              </div>

              <div class="form-control">
                <label for="email">Email</label>
                <input type="email" placeholder="example@gmail.com" id="email" maxlength="30"/>
                <div class="checkbox">
                  <span class="checkbox__first-part"></span>
                  <span class="checkbox__second-part"></span>
                </div>
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
      </div>
    `;

    this.db = new Database();
    this.bestScore = new BestScore();
  }

  public validate(score: number): void {
    const btnAdd = document.getElementById('add');
    const firstName = document.getElementById('firstName');
    const secondName = document.getElementById('secondName');
    const email = document.getElementById('email');
    this.playerData.push(score);

    btnAdd.addEventListener('click', (e) => {
      e.preventDefault();

      this.checkInputs(firstName, secondName, email);

      if (this.playerData.length === 4) {
        this.upToDB();
      }
    });
  }

  private upToDB(): void {
    const playerDataObj: { [key: string]: unknown } = {
      score: this.playerData[0],
      firstName: this.playerData[1],
      secondName: this.playerData[2],
      email: this.playerData[3],
    };

    this.db.init('frostwOw13');
    setTimeout(() => {
      this.db.write('frostwOw13', playerDataObj);
    }, 100);
    window.location.hash = '#/best-score/';
    this.bestScore.initRecords();
  }

  private checkInputs(firstName: HTMLElement, secondName: HTMLElement, email: HTMLElement): void {
    const firstNameValue = (<HTMLInputElement>document.getElementById('firstName')).value.trim();
    const secondNameValue = (<HTMLInputElement>document.getElementById('secondName')).value.trim();
    const emailValue = (<HTMLInputElement>document.getElementById('email')).value.trim();

    if (firstNameValue === '') {
      Form.setErrorFor(firstName, 'First name cannot be blank');
    } else if (Form.isName(firstNameValue)) {
      Form.setErrorFor(firstName, 'First name cannot contain special characters');
    } else if (!Form.isContainLetters(firstNameValue)) {
      Form.setErrorFor(firstName, 'First name cannot consist only of numbers');
    } else {
      Form.setSuccessFor(firstName);
      this.playerData.push(firstNameValue);
    }

    if (secondNameValue === '') {
      Form.setErrorFor(secondName, 'Second name cannot be blank');
    } else if (Form.isName(secondNameValue)) {
      Form.setErrorFor(secondName, 'Second name cannot contain special characters');
    } else if (!Form.isContainLetters(secondNameValue)) {
      Form.setErrorFor(secondName, 'First name cannot consist only of numbers');
    } else {
      Form.setSuccessFor(secondName);
      this.playerData.push(secondNameValue);
    }

    if (emailValue === '') {
      Form.setErrorFor(email, 'Email cannot be blank');
    } else if (!Form.isEmail(emailValue)) {
      Form.setErrorFor(email, 'Email cannot contain special characters');
    } else {
      Form.setSuccessFor(email);
      this.playerData.push(emailValue);
    }
  }

  static setErrorFor(input: HTMLElement, message: string): void {
    const formControl = input.parentElement;
    const small = formControl?.querySelector('small');

    if (formControl) formControl.className = 'form-control error';
    if (small) small.innerText = message;
  }

  static setSuccessFor(input: HTMLElement): void {
    const formControl = input.parentElement;
    if (formControl) formControl.className = 'form-control success';
  }

  static isContainLetters(name: string): boolean {
    const regexp = /[^\d]/;
    return regexp.test(name);
  }

  static isName(name: string): boolean {
    const regexp = /[~!@#$%*()_—+=|:;"'`<>,.?^]/;
    return regexp.test(name);
  }

  static isEmail(email: string): boolean {
    const regexp = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
    return regexp.test(email);
  }
}
