import { render, screen } from '@testing-library/react';
import App from './App';

test('renders church management app', () => {
  render(<App />);
  const linkElement = screen.getByText(/Gestión Iglesia/i);
  expect(linkElement).toBeInTheDocument();
});