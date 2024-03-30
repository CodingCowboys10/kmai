// npx jest src/tests/components/DocTable.test.tsx --coverage
import React from 'react';
import { render } from '@testing-library/react';
import DocTable from '@/components/documents/docTable';

describe('DocTable', () => {
  it('Verifica che il componente DocTable sia renderizzato correttamente', () => {
    const { container } = render(<DocTable />);
    
    expect(container).toBeInTheDocument();
  });

});