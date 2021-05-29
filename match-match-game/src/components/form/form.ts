import { BaseComponent } from '../base-component';
import './form.scss';

export class Form extends BaseComponent {
  private readonly btnAdd: HTMLElement | null;

  constructor() {
    super('div', ['form']);

    this.element.innerHTML = `
      <div class="form__container">
        <div class="form__body">
          <div class="form__header">
            <h3>Register new player</h3>
          </div>

          <div class="form-wrapper">
            <form id="form" class="form">

              <div class="form-control">
                <label for="firstName">First name</label>
                <input type="text" placeholder="Jones" id="firstName" maxlength="30"/>
                <div class="checkbox"><span class="first"></span><span class="second"></span></div>
                <small>Error message</small>
              </div>

              <div class="form-control">
                <label for="secondName">Second name</label>
                <input type="text" placeholder="Dermot" id="secondName" maxlength="30"/>
                <div class="checkbox"><span class="first"></span><span class="second"></span></div>
                <small>Error message</small>
              </div>

              <div class="form-control">
                <label for="email">Email</label>
                <input type="email" placeholder="example@gmail.com" id="email" maxlength="30"/>
                <div class="checkbox"><span class="first"></span><span class="second"></span></div>
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

    this.btnAdd = document.getElementById('add');
  }

  public validate(): void {
    const firstName = document.getElementById('firstName');
    const secondName = document.getElementById('secondName');
    const email = document.getElementById('email');

    this.btnAdd?.addEventListener('click', (e) => {
      e.preventDefault();

      Form.checkInputs(firstName!, secondName!, email!);
    });
  }

  static checkInputs(firstName: HTMLElement, secondName: HTMLElement, email: HTMLElement): void {
    const firstNameValue = (<HTMLInputElement>document.getElementById('firstName')).value.trim();
    const secondNameValue = (<HTMLInputElement>document.getElementById('secondName')).value.trim();
    const emailValue = (<HTMLInputElement>document.getElementById('email')).value.trim();

    if (firstNameValue === '') {
      Form.setErrorFor(firstName, 'First name cannot be blank');
    } else if (Form.isName(firstNameValue)) {
      Form.setErrorFor(firstName, 'First name cannot contain numbers or special characters');
    } else {
      Form.setSuccessFor(firstName);
    }

    if (secondNameValue === '') {
      Form.setErrorFor(secondName, 'Second name cannot be blank');
    } else if (Form.isName(secondNameValue)) {
      Form.setErrorFor(secondName, 'Second name cannot contain numbers or special characters');
    } else {
      Form.setSuccessFor(secondName);
    }

    if (emailValue === '') {
      Form.setErrorFor(email, 'Email cannot be blank');
    } else if (!Form.isEmail(emailValue)) {
      Form.setErrorFor(email, 'Email cannot contain special characters');
    } else {
      Form.setSuccessFor(email);
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

  static isName(name: string): boolean {
    return /[0-9!~@#$%^&*()_+-={}[\].,:;"'?|<>]/.test(name);
  }

  static isEmail(email: string): boolean {
    return /^(([^<>().,;:\s@"]+(\.[^<>().,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }
}
