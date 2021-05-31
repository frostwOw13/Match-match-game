import { Card } from './components/card/card';
import { GameTimer } from './components/game-timer/game-timer';
import { MainField } from './components/main-field/main-field';
import { PopUp } from './components/pop-up/pop-up';
import { ImageCategoryModel } from './models/image-category-model';
import { delay } from './shared/delay';
import { FLIP_DELAY, SHOW_TIME } from './shared/constants';
import { Form } from './components/form/form';

export class Game {
  /**
   * Initialized the first game
   */
  public gameFirstStart: boolean;

  /**
   * For scoring the points
   */
  private score: number;

  /**
   * Incorrectly selected cards
   */
  private falseCards: number;

  /**
   * Checking if card is choosen now or not
   */
  private activeCard?: Card;

  /**
   * Boolean for prevent double clicking bug on cards
   */
  private isAnimation = false;

  private readonly gameTimer: GameTimer;

  private readonly mainField: MainField;

  private readonly popUp: PopUp;

  private readonly form: Form;

  constructor() {
    this.gameTimer = new GameTimer();
    this.mainField = new MainField();
    this.popUp = new PopUp();
    this.form = new Form();
    this.gameFirstStart = false;
    this.score = 0;
    this.falseCards = 0;
  }

  public addField(images: string[]): void {
    this.mainField.clear();

    const cards = images
      .concat(images)
      .map((url: string) => new Card(url))
      .sort(() => Math.random() - 0.5);

    this.mainField.addCards(cards);

    cards.forEach((card) => {
      card.element.addEventListener('click', () => this.cardHandler(card));
    });
  }

  private async cardHandler(card: Card): Promise<void> {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;

    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card; // If you have not active card, add new active
      this.isAnimation = false;
      return;
    }

    if (this.activeCard.image !== card.image) { // If cards not match
      this.mainField.removeAddClass(this.activeCard.cardSelf.element, card.cardSelf.element, 'red');
      this.falseCards++;
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
    } else {
      this.activeCard.cardSelf.element.classList.add('green');
      card.cardSelf.element.classList.add('green');

      let countClasses = 0;

      this.mainField.cards.forEach((mainCard) => {
        if (mainCard.cardSelf.element.classList.contains('green')) {
          countClasses++;
          if (countClasses === this.mainField.cards.length) {
            this.activeCard = undefined;
            this.isAnimation = false;

            this.win();
          }
        }
      });
      countClasses = 0;
    }

    this.activeCard = undefined;
    this.isAnimation = false;
  }

  public async newGame(cardsType: string, difficultyField: string): Promise<void> {
    this.gameTimer.timerStop();
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const cat = cardsType === 'Animals' ? categories[0] : categories[1];

    const images = cat.images.slice().map((name) => `${cat.category}/${name}`);

    this.continueGame();

    if (difficultyField === '4x3') {
      Game.flipField();
      this.addField(images.slice(4));
    } else if (difficultyField === '4x4') {
      Game.flipField();
      this.addField(images.slice(2));
    } else {
      this.addField(images);
      Game.flipField();
    }
    this.gameTimer.timerStart();
  }

  static flipField() {
    document.querySelectorAll('.field-container__card').forEach((card) => {
      card?.classList.toggle('fieldFlip');
    });
  }

  public continueGame() {
    document.getElementById('main')?.appendChild(this.gameTimer.element);
    document.getElementById('main')?.appendChild(this.mainField.element);
  }

  private win(): void {
    const minutes = Number(document.querySelector('.timer__count')?.innerHTML.split(':')[0]);
    const seconds = Number(document.querySelector('.timer__count')?.innerHTML.split(':')[1]);
    this.gameTimer.timerStop();
    this.score = (this.mainField.cards.length - this.falseCards) * 100 - ((minutes * 60) + seconds);
    if (this.score < 0) this.score = 0;

    this.mainField.element.appendChild(this.popUp.element);
    this.popUp.element.classList.add('active');
    this.popUp.winner(minutes, seconds, this.score);
    if (this.popUp.isReg) {
      this.popUp.element.classList.add('hidden');
      this.mainField.element.appendChild(this.form.element);
    }
    this.gameFirstStart = false;
  }
}
