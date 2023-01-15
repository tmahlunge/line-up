import React from 'react'
import { render, renderHook } from '@testing-library/react'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import {State} from "../state";
import {setupStore} from "../store";

interface RenderOptions {
  preloadedState?: PreloadedState<State>;
}

/**
 * This will render a component with access to a real-live store. This will make tests more heavy-weight than mocking
 * however, this will give us the ability to test any component, no matter how small, with access to the full app store.
 * This gives us the ability to catch unintended bugs caused by unexpected state changes.
 * @param component The component to render
 * @param preloadedState The state we want to render the store with.
 */
export function renderWithStore(
  component: React.ReactElement,
  { preloadedState }: RenderOptions
) {
  const store = setupStore(preloadedState);

  const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <Provider store={store}>
        {children}
    </Provider>;
  }

  return { store, ...render(component, { wrapper: Wrapper }) }
}