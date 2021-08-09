import React from 'react';
import { render, screen } from '@testing-library/react';
import Comment from './Comment';

describe('Comment Component', () => {
  beforeEach(() => {
    render(<Comment name="hello" body="world" />);
  });

  it('should render the title correctly', () => {
    const titleElement = screen.getByTestId('name');

    expect(titleElement.innerHTML).toBe('hello');
  });


  it('should render the world correctly', () => {
    const bodyElement = screen.getByTestId('content');

    expect(bodyElement.innerHTML).toBe('world');
  });
});