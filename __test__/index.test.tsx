import { render } from '@testing-library/react';
import HomePage from '../app/page';
import { Providers } from '../lib/providers';

describe('index page', () => {
  it('renders valid HTML', () => {
    const result = render(
      <Providers>
        <HomePage />
      </Providers>
    );

    expect(result.container.outerHTML).toRenderValidHTML();
  });
});
