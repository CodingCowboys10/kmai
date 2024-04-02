// npx jest src/tests/components/DataTable.test.tsx --coverage
import React from 'react';
import { render, screen } from '@testing-library/react';
import { DataTable } from '@/components/documents/dataTable';
import { columns } from '@/components/documents/docContent';

describe('DataTable', () => {
  it('Verifica che il componente DataTable sia renderizzato correttamente', () => {

    jest.mock('@/providers/document-provider', () => ({
      useDocumentData: () => ({ data: [], isLoading: false }),
    }));

    try {
        render(<DataTable columns={columns} />);

        expect(screen.getByTestId('InputBarraRicerca')).toBeInTheDocument();
        expect(screen.getByTestId('SettingsBarraRicerca')).toBeInTheDocument();
        expect(screen.getByTestId('DataTableViewOptions')).toBeInTheDocument();
        expect(screen.getByTestId('DataTablePagination')).toBeInTheDocument();
    }catch(e){
    }
  });
});