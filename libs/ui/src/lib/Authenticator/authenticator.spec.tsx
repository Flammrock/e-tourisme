import { render } from '@testing-library/react';

import { AuthContainer } from './authenticator';

describe('Authenticator', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthContainer><span>some dummy text</span></AuthContainer>);
    expect(baseElement).toBeTruthy();
  });
});
