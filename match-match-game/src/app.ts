import { MainField } from './components/main-field/main-field';
import { ImageCategoryModel } from './models/image-category-model';
import { GameTimer } from './components/game-timer/game-timer';
import { Header } from './components/header/header';
import { AboutGame } from './components/about-game/about-game';
import { BestScore } from './components/best-score/best-score';
import { Settings } from './components/settings-page/settings';
import { PopUp } from './components/pop-up/pop-up';
import { Game } from './game';

export class App {
  private readonly header: Header;

  private readonly aboutGame: AboutGame;

  private readonly bestScore: BestScore;

  private readonly game: Game;

  private readonly settings: Settings;

  private gameFirstStart: boolean;// Var to initialize first game

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.aboutGame = new AboutGame();
    this.bestScore = new BestScore();
    this.settings = new Settings();
    this.game = new Game();
    this.gameFirstStart = false;

    window.location.hash = '#/';
    this.render(window.location.hash);
  }

  render(location: string) {
    this.rootElement.before(this.header.element);

    window.onhashchange = () => this.render(window.location.hash);

    switch (location) {
      case '#/':
        this.rootElement.innerHTML = '';
        this.rootElement.appendChild(this.aboutGame.element);
        break;
      case '#/game/':
        this.rootElement.innerHTML = '';
        if (!this.game.gameFirstStart) {
          this.game.newGame();
          console.log('new game');
          this.gameFirstStart = true;
        } else {
          console.log('continue game');
          this.game.continueGame();
        }
        break;
      case '#/best-score/':
        this.rootElement.innerHTML = '';
        this.rootElement.appendChild(this.bestScore.element);
        break;
      case '#/settings/':
        this.rootElement.innerHTML = '';
        this.rootElement.appendChild(this.settings.element);
        break;
      default:
        throw new Error('No route');
    }
  }
}
