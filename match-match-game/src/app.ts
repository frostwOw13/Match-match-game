import { Header } from './components/header/header';
import { AboutGame } from './components/about-game/about-game';
import { BestScore } from './components/best-score/best-score';
import { Settings } from './components/settings-page/settings';
import { Game } from './game';
import { Form } from './components/form/form';
import { Database } from './database';

interface MyRecord {
  firstName: string
  secondName: string
  email: string
  score: number
  id?: IDBValidKey
}
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

  public database: Database;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.aboutGame = new AboutGame();
    this.bestScore = new BestScore();
    this.settings = new Settings();
    this.game = new Game();
    this.form = new Form();
    this.database = new Database();

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
        document.querySelectorAll('.nav__item').forEach((item) => {
          item.classList.remove('active');
        });
        document.querySelectorAll('.nav__item')[0].classList.add('active');
        // this.database.init('frostwOw13');

        // this.database.write<MyRecord>('frostwOw13', {
        //   firstName: '12321',
        //   secondName: 'a12313s',
        //   email: 'as11111111d',
        //   score: 333,
        // })
        // this.database.readAll<MyRecord>('frostwOw13');
        // this.database.readFiltered<MyRecord>('frostwOw13', (item) => item.email.length < 6);
        break;
      case '#/game/':
        this.rootElement.innerHTML = '';

        if (this.settings.isAnimal) {
          this.game.newGame('Animals', this.settings.difficultyField);
        } else {
          this.game.newGame('Cars', this.settings.difficultyField);
        }
        break;
      case '#/best-score/':
        this.rootElement.innerHTML = '';
        this.rootElement.appendChild(this.bestScore.element);
        document.querySelectorAll('.nav__item').forEach((item) => {
          item.classList.remove('active');
        });
        document.querySelectorAll('.nav__item')[1].classList.add('active');
        break;
      case '#/settings/':
        this.rootElement.innerHTML = '';
        this.rootElement.appendChild(this.settings.element);
        this.settings.chooseCardType();
        this.settings.chooseDifficulty();
        document.querySelectorAll('.nav__item').forEach((item) => {
          item.classList.remove('active');
        });
        document.querySelectorAll('.nav__item')[2].classList.add('active');
        break;
      default:
        throw new Error('No route');
    }
  }
}
