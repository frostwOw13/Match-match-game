import { MainField } from "./components/main-field/main-field";
import { ImageCategoryModel } from "./models/image-category-model";
import { GameTimer } from "./components/game-timer/game-timer";
import { Header } from "./components/header/header";
import { AboutGame } from "./components/about-game/about-game";

export class App {
  private readonly header: Header;
  private readonly mainField: MainField;
  private readonly gameTimer: GameTimer;
  private readonly aboutGame: AboutGame;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.mainField = new MainField();
    this.gameTimer = new GameTimer();
    this.aboutGame = new AboutGame();

    window.location.hash = "#/";
    this.render('#/');
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
