// npx jest src/tests/components/ModelToggle.test.tsx --coverage
import React from 'react';
import { render, screen } from '@testing-library/react';
import ModelToggle from "@/components/settings/modelToggle";

describe('ThemeToggle', () => {
  it('Verifica che il componente ThemeToggle sia renderizzato correttamente', () => {

    render(<ModelToggle />);

    expect(screen.getByText('Modello')).toBeInTheDocument();
    expect(screen.getByTestId('TriggerModel')).toBeInTheDocument();
  });
});