// npx jest src/tests/components/DataTableViewOption.test.tsx --coverage
import React from 'react';
import { render, screen } from '@testing-library/react';
import { DataTableViewOptions } from '@/components/documents/dataTableViewOption';

describe('DataTableViewOptions', () => {
    it('Verifica che il componente DataTableViewOptions sia renderizzato correttamente', () => {
        
        const tableMock = {
            getAllColumns: () => [],
            _features: [],
            _getAllFlatColumnsById: () => [],
            _getColumnDefs: () => [],
            _getDefaultColumnDef: () => {}
        };
        
        render(<DataTableViewOptions table={tableMock as any} />);
        
        expect(screen.getByText('Colonne')).toBeInTheDocument();

      });
  });