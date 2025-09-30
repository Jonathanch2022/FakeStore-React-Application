import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../test-utils.jsx';
import RateStar from '../components/RateStar.jsx';

describe('<RateStar />', () => {
    it('renders rating label, count, and star icons (or characters)', () => {
        let countValue = 42;
        let rating = 3.6;
        const { getByTestId, getByText } = renderWithProviders(<RateStar rating={rating} ratingCount={countValue} />);
      const count = getByTestId("count");
      
        expect(count).toBeInTheDocument();
        expect(count.textContent).toContain(countValue.toString())
   
    const stars = screen.queryAllByRole('img', { name: /star/i });
        if (stars.length) {
            expect([Math.floor(rating), Math.round(rating)]).toContain(stars.length);
    }
  });
});
