import RatingStars from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockRating = 3;
const mockClickHandler = jest.fn();

beforeEach(() => {
  render(
    <RatingStars id="foobar" rating={mockRating} onClick={mockClickHandler} />
  );
});

afterEach(() => {
  mockClickHandler.mockReset();
});

describe('RatingStars', () => {
  it('renders yellow stars based on "rating" prop', () => {
    expect(screen.getAllByLabelText('Rating star yellow').length).toBe(
      mockRating
    );
  });

  it('calls "onClick" prop if provided with the correct argument', () => {
    const starIndex = 1;
    expect(mockClickHandler).toHaveBeenCalledTimes(0);
    userEvent.click(screen.getAllByLabelText('Rating star yellow')[starIndex]);
    expect(mockClickHandler).toHaveBeenCalledWith(starIndex);
  });
});
