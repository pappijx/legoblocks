import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BrowserRouter></BrowserRouter>);
    expect(baseElement).toBeTruthy();
  });
});
