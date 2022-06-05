import React from 'react';
import configureStore from 'redux-mock-store';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import '@testing-library/jest-dom';
import Counter from './Counter';
import { Provider } from 'react-redux';

const mockStore = configureStore([]);

describe('Counter Component', () => {
  let store;
  let component: ReactTestRenderer;

  beforeEach(() => {
    store = mockStore({
      counter: {
        value: 0,
      },
    });

    component = renderer.create(
      <Provider store={store}>
        <Counter />
      </Provider>
    );
  });
  test('snapshot', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
