// npx jest src/tests/components/ChatMessages.test.tsx --coverage
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatMessages from "@/components/chat/chatMessages";

describe('ChatMessages', () => {
  it('Verifica che il componente ChatMessages sia renderizzato correttamente', () => {

    render(<ChatMessages />);
    expect(screen.getByText('Inizia una nuova conversazione')).toBeInTheDocument();
    expect(screen.getByTestId('ChatHistoryArea')).toBeInTheDocument();
  });
});