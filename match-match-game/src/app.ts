import { MainField } from "./components/main-field/main-field";
import { ImageCategoryModel } from "./models/image-category-model";
import { GameTimer } from "./components/game-timer/game-timer";
import { Header } from "./components/header/header";
import { AboutGame } from "./components/about-game/about-game";
import { BestScore } from "./components/best-score/best-score";
import { Settings } from "./components/settings-page/settings";

export class App {
  private readonly header: Header;
  private readonly mainField: MainField;
  private readonly gameTimer: GameTimer;
  private readonly aboutGame: AboutGame;
  private readonly bestScore: BestScore;
  private readonly settings: Settings;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.mainField = new MainField();
    this.gameTimer = new GameTimer();
    this.aboutGame = new AboutGame();
    this.bestScore = new BestScore();
    this.settings = new Settings();

    window.location.hash = "#/";
    this.render(window.location.hash);
  }

  render(location: string) {
    this.rootElement.before(this.header.element);

    window.onhashchange = () => this.render(window.location.hash);

    switch (location) {
      case "#/":
        this.rootElement.innerHTML = ``;
        this.rootElement.appendChild(this.aboutGame.element);
        break
      case "#/game/":
        this.rootElement.innerHTML = ``;
        this.rootElement.appendChild(this.gameTimer.element);
        this.rootElement.appendChild(this.mainField.element);
        break
      case "#/best-score/":
        this.rootElement.innerHTML = ``;
        this.rootElement.appendChild(this.bestScore.element);
        break
      case "#/settings/":
        this.rootElement.innerHTML = ``;
        this.rootElement.appendChild(this.settings.element);
    }
  }

  async start() {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const cat = categories[0];

    const images = cat.images.map((name) => `${cat.category}/${name}`);
    this.mainField.newGame(images);
    this.gameTimer.timerStart();
  }
}
