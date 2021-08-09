import React from 'react';
import { render, screen } from '@testing-library/react';
import Post from './Post';

describe('Post Component', () => {
  beforeEach(() => {
    render(<Post title="hello" body="world" />);
  });

  it('should render the title correctly', () => {
    const titleElement = screen.getByTestId('title');

    expect(titleElement.innerHTML).toBe('hello');
  });


  it('should render the world correctly', () => {
    const bodyElement = screen.getByTestId('content');

    expect(bodyElement.innerHTML).toBe('world');
  });
});