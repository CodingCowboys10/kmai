// npx jest src/tests/components/Settings.test.tsx --coverage
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import  Settings from '@/components/settings/settings'

describe('Settings', () => {
  it('Verifica che il componente Settings sia renderizzato correttamente', () => {

    render(<Settings isChat={true} />);

    expect(screen.getByTestId('TriggerSettings')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('TriggerSettings'));
    expect(screen.getByTestId('DialogTitle')).toBeInTheDocument();
    expect(screen.getByTestId('DialogDescription')).toBeInTheDocument();
    expect(screen.getByText('Modello')).toBeInTheDocument();
    expect(screen.getByText('Tema')).toBeInTheDocument();
    expect(screen.getByText('Vedi i Documenti')).toBeInTheDocument();
  });
});