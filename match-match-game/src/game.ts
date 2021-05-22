import { Card } from './components/card/card';
import { GameTimer } from './components/game-timer/game-timer';
import { MainField } from './components/main-field/main-field';
import { PopUp } from './components/pop-up/pop-up';
import { ImageCategoryModel } from './models/image-category-model';

export class Game {
  gameFirstStart: boolean;

  private score: number;

  private falseCards: number;// incorrectly selected cards

  private activeCard?: Card;

  private isAnimation = false;

  private readonly gameTimer: GameTimer;

  private readonly mainField: MainField;

  private readonly popUp: PopUp;

  private cards: Card[] = [];

  constructor() {
    this.gameTimer = new GameTimer();
    this.mainField = new MainField();
    this.popUp = new PopUp();
    this.gameFirstStart = false;
    this.score = 0;
    this.falseCards = 0;
  }

  addField(images: string[]) {
    this.mainField.clear();

    const cards = images
      .concat(images)
      .map((url: string) => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
      card.element.addEventListener('click', () => this.cardHandler(card));
    });

    this.mainField.addCards(cards);
  }

  private async cardHandler(card: Card) {
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
      // await delay(FLIP_DELAY);
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

  async newGame() {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const cat = categories[0];

    const images = cat.images.map((name) => `${cat.category}/${name}`);

    this.continueGame();

    this.addField(images);
    this.gameTimer.timerStart();
  }

  continueGame() {
    document.getElementById('main')?.appendChild(this.gameTimer.element);
    document.getElementById('main')?.appendChild(this.mainField.element);
  }

  win() {
    this.gameTimer.timerStop();
    const minutes = Number(document.querySelector('.timer__count')?.innerHTML.split(':')[0]);
    const seconds = Number(document.querySelector('.timer__count')?.innerHTML.split(':')[1]);
    this.score = (this.mainField.cards.length - this.falseCards) * 100 - ((minutes * 60) + seconds);
    if (this.score < 0) this.score = 0;

    this.mainField.element.appendChild(this.popUp.element);
    this.popUp.element.classList.add('active');
    this.popUp.winner(minutes, seconds, this.score);
    this.gameFirstStart = false;
  }
}
