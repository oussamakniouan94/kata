import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

export function storageMetaReducer<S>(
  reducer: ActionReducer<S>
): ActionReducer<S> {
  return function (state, action) {
    const nextState = reducer(state, action);

    if (typeof window !== 'undefined' && action.type !== INIT && action.type !== UPDATE) {
      localStorage.setItem('app-state', JSON.stringify(nextState));
    }

    if (action.type === INIT || action.type === UPDATE) {
      const saved = localStorage.getItem('app-state');
      if (saved) {
        return JSON.parse(saved);
      }
    }

    return nextState;
  };
}
