import './styles/styles.scss'
import {App} from './app'

window.onload = () => {
  const appElement = document.getElementById('main-wrapper');

  if (!appElement) throw Error('App root element not found');

  new App(appElement).start();
}
