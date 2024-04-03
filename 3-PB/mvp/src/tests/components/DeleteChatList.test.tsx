// npx jest src/tests/components/DeleteChatList.test.tsx --coverage
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteChatList from "@/components/chat/deleteChatList";

describe('DeleteChatList', () => {
  it('Verifica che il componente DeleteChatList sia renderizzato correttamente', () => {

    render(<DeleteChatList />);

    expect(screen.getByText('Elimina tutte le Conversazioni')).toBeInTheDocument();
    expect(screen.getByTestId('TriggerDelete')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('TriggerDelete'));
    expect(screen.getByText('Conferma eliminazione.')).toBeInTheDocument();
    expect(screen.getByText('Elimina tutte le Conversazioni')).toBeInTheDocument();
    expect(screen.getByText("L'eliminazione delle sessioni è un'operazione irreversibile.")).toBeInTheDocument();
    expect(screen.getByTestId('ButtonCancel')).toBeInTheDocument();
    expect(screen.getByTestId('ButtonDelete')).toBeInTheDocument();
  });

  it('Verifica comportamento', () => {

    render(<DeleteChatList />);
    fireEvent.click(screen.getByTestId('TriggerDelete'));
    fireEvent.click(screen.getByTestId('ButtonCancel'));
  });

  it('Verifica comportamento', () => {

    render(<DeleteChatList />);
    fireEvent.click(screen.getByTestId('TriggerDelete'));
    fireEvent.click(screen.getByTestId('ButtonDelete'));
  });
});