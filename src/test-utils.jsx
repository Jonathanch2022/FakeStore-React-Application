import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store as appStore } from './state/Store.jsx';
import { MemoryRouter } from 'react-router-dom';

export function renderWithProviders(ui, { store = appStore, route = '/' } = {}) {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Provider>
  );
}
