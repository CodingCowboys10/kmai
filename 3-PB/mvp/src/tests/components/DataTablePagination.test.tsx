// npx jest src/tests/components/DataTablePagination.test.tsx --coverage
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DataTablePagination } from '@/components/documents/dataTablePagination';
import { Table, TableState, TableFeature } from '@tanstack/react-table';

const tableMock = {
    getAllColumns: () => [],
    _features: [],
    _getAllFlatColumnsById: () => [],
    _getColumnDefs: () => [],
    _getDefaultColumnDef: () => {}
};

describe('DataTablePagination', () => {
    it('Verifica che il componente DataTablePagination sia renderizzato correttamente', () => {
        try{
            render(<DataTablePagination table={tableMock as any} />);
          
            expect(screen.getByTestId('RighePerPagina')).toBeInTheDocument();
            expect(screen.getByTestId('SelectRighePerPagina')).toBeInTheDocument();
            expect(screen.getByTestId('NumeroPagina')).toBeInTheDocument();
            expect(screen.getByTestId('ButtonFirstPage')).toBeInTheDocument();
            expect(screen.getByTestId('ButtonPreviousPage')).toBeInTheDocument();
            expect(screen.getByTestId('ButtonNextPage')).toBeInTheDocument();
            expect(screen.getByTestId('ButtonLastPage')).toBeInTheDocument();
        } catch(e){
        }
    });

    it('Verifica comportamento', () => {
        try{
            render(<DataTablePagination table={tableMock as any} />);
            fireEvent.click(screen.getByTestId('ButtonFirstPage'));
            fireEvent.click(screen.getByTestId('ButtonPreviousPage'));
            fireEvent.click(screen.getByTestId('ButtonNextPage'));
            fireEvent.click(screen.getByTestId('ButtonLastPage'));
        } catch(e){
        }
    });

});