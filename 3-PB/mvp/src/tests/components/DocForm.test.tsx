// npx jest src/tests/components/DocForm.test.tsx --coverage
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DocForm from '@/components/documents/docForm';

describe('DocForm', () => {
  it('Verifica che il componente DocForm sia renderizzato correttamente', () => {
    render(<DocForm />);
    
    const button = screen.getByTestId("AllDiaTrigger");
    expect(screen.getByText('Aggiungi Documento')).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.getByText('Trascina il file o clicca per cercarlo')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("handleFormSubmitButton"));
  });
});