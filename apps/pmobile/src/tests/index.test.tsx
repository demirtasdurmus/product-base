import * as React from 'react';
import { render } from '@testing-library/react-native';
import Home from '../app/index';

test('renders correctly', () => {
  const { getByTestId } = render(<Home />);
  expect(getByTestId('heading')).toHaveTextContent(/Welcome/);
});
