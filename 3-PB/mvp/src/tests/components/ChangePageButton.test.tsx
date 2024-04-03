// npx jest src/tests/components/ChangePageButton.test.tsx --coverage
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import  ChangePageButton from '@/components/settings/changePageButton'

describe('ChangePageButton', () => {
  it('Verifica che il componente ChangePageButton sia renderizzato correttamente', () => {

    render(<ChangePageButton to={"chat"} />);

    expect(screen.getByText('Vedi i Documenti')).toBeInTheDocument();
    expect(screen.getByTestId('LinkChange')).toBeInTheDocument();
    expect(screen.getByTestId('ButtonChange')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('ButtonChange'));
    
  });

  it('Verifica che il componente ChangePageButton sia renderizzato correttamente', () => {

    render(<ChangePageButton to={"documents"} />);

    expect(screen.getByText('Vai alla Chat')).toBeInTheDocument();
    expect(screen.getByTestId('LinkChange')).toBeInTheDocument();
    expect(screen.getByTestId('ButtonChange')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('ButtonChange'));
  });
});