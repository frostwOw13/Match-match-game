import { BaseComponent } from "../base-component";
import { HeaderLogo } from "./header-logo/header-logo";
import { HeaderNav } from "./header-nav/header-nav";
import { HeaderReg } from "./header-reg/header-reg";
import './header.scss';

export class Header extends BaseComponent {
  private readonly headerLogo: HeaderLogo;
  private readonly headerNav: HeaderNav;
  private readonly headerReg: HeaderReg;
  constructor() {
    super('header', ['header']);

    this.headerLogo = new HeaderLogo();
    this.headerNav = new HeaderNav();
    this.headerReg = new HeaderReg();

    this.element.appendChild(this.headerLogo.element);
    this.element.appendChild(this.headerNav.element);
    this.element.appendChild(this.headerReg.element);
  }
}
