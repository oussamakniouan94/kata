// storage.metareducer.ts
import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { isPlatformBrowser } from '@angular/common';

export function storageMetaReducer<S>(
  reducer: ActionReducer<S>,
  platformId: Object
): ActionReducer<S> {
  return function (state, action) {
    const nextState = reducer(state, action);

    if (isPlatformBrowser(platformId)) {
      if (action.type !== INIT && action.type !== UPDATE) {
        try {
          localStorage.setItem('app-state', JSON.stringify(nextState));
        } catch { }
      }

      if (action.type === INIT || action.type === UPDATE) {
        try {
          const saved = localStorage.getItem('app-state');
          if (saved) {
            return JSON.parse(saved);
          }
        } catch { }
      }
    }

    return nextState;
  };
}