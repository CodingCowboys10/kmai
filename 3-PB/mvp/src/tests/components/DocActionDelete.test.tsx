// npx jest src/tests/components/DocActionDelete.test.tsx --coverage
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DocActionDelete from '@/components/documents/docActionDelete';

describe('DocActionDelete', () => {
  it('Verifica che il componente DocActionDelete sia renderizzato correttamente', () => {
    render(<DocActionDelete name='nameTest'/>);
    
    const button = screen.getByTestId("AllDiaTrigger");
    fireEvent.click(button);
    expect(screen.getByText('Conferma eliminazione.')).toBeInTheDocument();
    expect(screen.getByText('Eliminando un documento, non potrai più fare domande su di esso.')).toBeInTheDocument();
  });

  it('Verifica comportamento', () => {
    render(<DocActionDelete name='nameTest'/>);
    
    const button = screen.getByTestId("AllDiaTrigger");
    fireEvent.click(button);
    fireEvent.click(screen.getByTestId("AllDiaDelete"));
  });

  it('Verifica comportamento', () => {
    render(<DocActionDelete name='nameTest'/>);
    
    const button = screen.getByTestId("AllDiaTrigger");
    fireEvent.click(button);
    fireEvent.click(screen.getByTestId("AllDiaCancel"));
  });

});