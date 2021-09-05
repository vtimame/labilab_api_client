import { App } from './App';
import { createContext, useContext } from 'react';

export class Store {
  app: App;

  constructor() {
    this.app = new App(this);
  }
}

export const StoreInstance = new Store();
export const StoreContext = createContext<Store>({} as Store);
export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext);
