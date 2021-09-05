import { action, makeObservable, observable, toJS } from 'mobx';
import { Store } from './Store';
import { User } from '../types';

export class App {
  root: Store;
  userIsLogged: boolean = false;
  networkError: boolean = false;
  brightness: string = localStorage.getItem('brightness') || 'light';
  userInstance: User | null = null;

  get isDark() {
    return this.brightness === 'dark';
  }

  get user() {
    return toJS(this.userInstance);
  }

  constructor(root: Store) {
    this.root = root;
    makeObservable(this, {
      userIsLogged: observable,
      brightness: observable,
      networkError: observable,
      userInstance: observable,
      setUserIsLogged: action,
      setBrightness: action,
      setNetworkError: action,
      setUser: action,
    });
  }

  setUserIsLogged(newState: boolean) {
    this.userIsLogged = newState;
  }

  setNetworkError(newState: boolean) {
    this.networkError = newState;
  }

  setBrightness(value: string) {
    this.brightness = value;
  }

  setUser(user: User) {
    this.userInstance = user;
  }
}
