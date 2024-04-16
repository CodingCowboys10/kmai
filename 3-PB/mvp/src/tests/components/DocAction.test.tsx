// npx jest src/tests/components/DocAction.test.tsx --coverage
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DocAction from '@/components/documents/docAction';

describe('DocAction', () => {
  it('Verifica che il componente DocAction sia renderizzato correttamente', () => {
    render(<DocAction name='nameTest' visibility={true} />);
    
    expect(screen.getByTestId('Trigger')).toBeInTheDocument();
    expect(screen.getByText('Azioni')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('Trigger'));
  });

});