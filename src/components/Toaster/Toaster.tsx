import React from 'react';
import ReactDOM from 'react-dom';

const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';
const PORTAL_ID = 'labilab-toasts';

export class Toaster {
  constructor() {
    if (!isBrowser) {
      return;
    }

    let portalElement;
    const existingPortalElement = document.getElementById(PORTAL_ID);

    if (existingPortalElement) {
      portalElement = existingPortalElement;
    } else {
      const el = document.createElement('div');
      el.id = PORTAL_ID;
      el.className = 'Toaster';
      if (document.body !== null) {
        document.body.appendChild(el);
      }
      portalElement = el;
    }

    ReactDOM.render(<div>test</div>, portalElement);
  }

  notify = () => {
    console.log('hello');
  };
}
