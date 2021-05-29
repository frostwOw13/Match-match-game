import { Header } from './components/header/header';
import { AboutGame } from './components/about-game/about-game';
import { BestScore } from './components/best-score/best-score';
import { Settings } from './components/settings-page/settings';
import { Game } from './game';
import { Form } from './components/form/form';

export class App {
  /**
	 * Header component.
	 */
  private readonly header: Header;

  /**
	 * About game page route.
	 */
  private readonly aboutGame: AboutGame;

  /**
	 * Best score page route.
	 */
  private readonly bestScore: BestScore;

  /**
	 * Game page route.
	 */
  private readonly game: Game;

  /**
	 * Settings page route.
	 */
  private readonly settings: Settings;

  public form: Form;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.aboutGame = new AboutGame();
    this.bestScore = new BestScore();
    this.settings = new Settings();
    this.game = new Game();
    this.form = new Form();

    window.location.hash = '#/';
    this.render(window.location.hash);
  }

  render(location: string): void {
    this.rootElement.before(this.header.element);

    window.onhashchange = () => this.render(window.location.hash);

    switch (location) {
      case '#/':
        this.rootElement.innerHTML = '';
        this.rootElement.appendChild(this.aboutGame.element);
        break;
      case '#/game/':
        this.rootElement.innerHTML = '';
          if (this.settings.isAnimal) {
            this.game.newGame("Animals", this.settings.difficultyField);
          } else {
            this.game.newGame("Cars", this.settings.difficultyField);
          }
          this.game.gameFirstStart = true;
        break;
      case '#/best-score/':
        this.rootElement.innerHTML = '';
        this.rootElement.appendChild(this.bestScore.element);
        break;
      case '#/settings/':
        this.rootElement.innerHTML = '';
        this.rootElement.appendChild(this.settings.element);
        this.settings.chooseCardType();
        this.settings.chooseDifficulty();
        break;
      default:
        throw new Error('No route');
    }
  }
}
