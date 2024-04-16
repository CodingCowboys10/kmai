// npx jest src/tests/components/ThemeToggle.test.tsx --coverage
import React from 'react';
import { render, screen } from '@testing-library/react';
import ThemeToggle from "@/components/settings/themeToggle";

describe('ThemeToggle', () => {
  it('Verifica che il componente ThemeToggle sia renderizzato correttamente', () => {

    render(<ThemeToggle />);

    expect(screen.getByText('Tema')).toBeInTheDocument();
    expect(screen.getByTestId('TriggerTema')).toBeInTheDocument();
  });
});