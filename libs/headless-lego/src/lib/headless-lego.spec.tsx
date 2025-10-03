import { render } from '@testing-library/react';

import HeadlessLego from './headless-lego';

describe('HeadlessLego', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HeadlessLego />);
    expect(baseElement).toBeTruthy();
  });
});
