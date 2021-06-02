import { BaseComponent } from '../base-component';
import { CardsType } from './cards-type/cards-type';
import { Difficulty } from './difficulty/difficulty';
import './settings.scss';

export class Settings extends BaseComponent {
  private readonly cardsType: CardsType;

  private readonly difficulty: Difficulty;

  public isAnimal: boolean;

  public isCar: boolean;

  public difficultyField: string;

  constructor() {
    super('div', ['settings']);

    this.cardsType = new CardsType();
    this.difficulty = new Difficulty();
    this.isAnimal = true;
    this.isCar = false;
    this.difficultyField = '4x3';

    this.element.appendChild(this.cardsType.element);
    this.element.appendChild(this.difficulty.element);
  }

<<<<<<< HEAD
  chooseCardType(): void {
=======
  chooseCardType(): void {
>>>>>>> f0a46c0acb25b78089d33df3a4fd96dc4013a90e
    const option = document.getElementById('cards-type') as HTMLInputElement;
    option.addEventListener('input', () => {
      if (option.value === 'Animals') {
        this.isCar = false;
        this.isAnimal = true;
      } else if (option.value === 'Cars') {
        this.isAnimal = false;
        this.isCar = true;
      }
    });
  }

  public chooseDifficulty(): void {
    const option = document.getElementById('difficulty') as HTMLInputElement;
    option.addEventListener('input', () => {
      if (option.value === '1') {
        this.difficultyField = '4x3';
      } else if (option.value === '2') {
        this.difficultyField = '4x4';
      } else if (option.value === '3') {
        this.difficultyField = '4x5';
      }
    });
  }
}
